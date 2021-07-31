//PEGAR TEMPO DE TRABALHO, PAUSAS E SESSÕES DO LOCALSTORAGE
let work = localStorage.getItem('work')
let pause = localStorage.getItem('pause')
let section = localStorage.getItem('sections')

const bellSound = document.getElementById('bell')
const completionSound = document.getElementById('complete')

let isAllowed = false

//NOTIFICAÇÃO
const Notifyer = {
  async init() {
    const permission = await Notification.requestPermission()
    isAllowed = permission == 'granted' ? true : false
  },
  notify(type) {
    if (type != 'acabou') {
      new Notification(`${type.toUpperCase()} ACABOU!`, {
        body: `Volte para iniciar ${
          type == 'pausa' ? 'o trabalho!' : 'a pausa!'
        }`,
        icon: './assets/tomato-vegetable.png'
      })
    } else {
      new Notification('PARABÉNS', {
        body: `Você completou o pomodoro com ${
          work * section
        } minutos de trabalho!`,
        icon: './assets/tomato-vegetable.png'
      })
    }
  }
}

//SETAR DIV'S COM O TOTAL DE SESSÕES
const Section = {
  createDivSection() {
    let divSection = document.createElement('div')
    divSection.classList.add('session-time')
    return divSection
  },

  isertDiv() {
    const divFather = document.querySelector('.sections').childElementCount
    for (i = divFather; i < section; i++) {
      const divSection = this.createDivSection()
      document.querySelector('.sections').appendChild(divSection)
    }
  }
}

//ATUALIZAR NUMERO
const updateNumber = (minutes, seconds) => {
  const timerHtml = document.querySelector('.timer-work')
  timerHtml.innerHTML = `${minutes} : ${seconds}`
}

const toggleWorkPause = () => {
  if (document.querySelector('.timer-work.pause') != null || section == 1) {
    disableSections()
  }

  if (section > 0) {
    bellSound.play()
    document.querySelector('.timer-work').classList.toggle('pause')
    document.querySelector('.work-details').classList.toggle('pause')
    document.querySelector('.sections').classList.toggle('pause')
    if (document.querySelector('.timer-work.pause') != null) {
      if (isAllowed) {
        Notifyer.notify('trabalho')
      }
      updateNumber(pause, '00')
    } else {
      work = localStorage.getItem('work')
      if (isAllowed) {
        Notifyer.notify('pausa')
      }
      updateNumber(work, '00')
    }
  } else {
    completionSound.play()
    if (isAllowed) {
      Notifyer.notify('acabou')
    }
    document.querySelector('.work').classList.add('animation')
    document.querySelector('.work-details').classList.add('animation')
  }
}

//ATUALIZAR SESSÕES
const disableSections = () => {
  const sections = document.querySelector('.sections')
  const lastSection = sections.children[section - 1]
  lastSection.classList.add('disabled')
  section--
}

//TEMPORIZADOR DE ACORDO COM O TEMPO
const Timer = {
  time: 0,
  currentTime: 0,
  interval: null,

  timeToMinutes: time => Math.floor(time / 60),
  timeToSeconds: time => time % 60,

  formatTime: time => String(time).padStart(2, '0'),

  init(time) {
    Timer.time = time
    Timer.currentTime = time

    Timer.interval = setInterval(Timer.countdown, 1000)
  },

  countdown() {
    Timer.currentTime--

    let minutes = Timer.formatTime(Timer.timeToMinutes(Timer.currentTime))
    let seconds = Timer.formatTime(Timer.timeToSeconds(Timer.currentTime))

    updateNumber(minutes, seconds)

    if (Timer.currentTime === 0) {
      clearInterval(Timer.interval)
      document.querySelector('.play-pomodoro').innerHTML = 'play_arrow'
      toggleWorkPause()
      return
    }
  }
}

document.querySelector('.play-pomodoro').addEventListener('click', event => {
  if (section > 0) {
    if (event.target.innerHTML == 'play_arrow') {
      if (document.querySelector('.timer-work.pause') != null) {
        Timer.init(pause * 60)
      } else {
        Timer.init(work * 60)
      }
      event.target.innerHTML = 'pause'
    } else {
      work = Timer.currentTime / 60
      clearInterval(Timer.interval)
      event.target.innerHTML = 'play_arrow'
    }
  }
})

window.onload = async () => {
  Section.isertDiv()
  updateNumber(work, '00')
  await Notifyer.init()
}
