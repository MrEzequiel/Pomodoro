//VERIFICA OS INPUTS
const Verification = {
  input() {
    const inputWork = document.querySelector('#work').value
    const inputPause = document.querySelector('#pause').value
    const inputSections = document.querySelector('#sections').value

    if (
      inputWork === '' ||
      inputWork <= '0' ||
      inputPause === '' ||
      inputPause <= '0' ||
      inputSections === '' ||
      inputSections <= '0'
    ) {
      this.alert([inputWork, inputPause, inputSections])
    } else {
      saveInputs(
        parseInt(inputWork),
        parseInt(inputPause),
        parseInt(inputSections)
      )
    }
  },
  //ALERTA O USUÁRIO OS CAMPOS
  alert(target) {
    for (i = 0; i < target.length; i++) {
      if (target[i] === '' || target[i] <= '0') {
        const spanAlert = document.querySelector(`.span-alert.input${i + 1}`)
        spanAlert.style.display = 'block'
      }
    }
  },

  closeAlert(target) {
    target.style.display = 'none'
  }
}

const inputValue = {
  increment(target) {
    target.value++
  },
  decrement(target) {
    target.value--
  }
}

//SE TODOS OS INPUTS FORAM VÁLIDOS, SALVAR VALORES NO LOCAL STORAGE
function saveInputs(work, pause, sections) {
  document.querySelector('.pomodoro').classList.remove('alert')

  localStorage.setItem('work', work)
  localStorage.setItem('pause', pause)
  localStorage.setItem('sections', sections)

  redirectPage()
}

// DEPOIS REDIRECIONAR PARA PÁGINA DO POMODORO
const redirectPage = () => (window.location.href = 'pomodoro.html')

document.querySelectorAll('.input-home').forEach(input => {
  input.addEventListener('focusin', event => {
    Verification.closeAlert(
      event.target.parentElement.parentElement.firstElementChild
    )
  })
})

document.querySelectorAll('.button-up').forEach(button => {
  button.addEventListener('click', event => {
    inputValue.increment(
      event.currentTarget.parentElement.parentElement.lastElementChild
    )
  })
})

document.querySelectorAll('.button-down').forEach(button => {
  button.addEventListener('click', event => {
    inputValue.decrement(
      event.currentTarget.parentElement.parentElement.lastElementChild
    )
  })
})

// QUANDO O BOTÃO FOR CLICADO
document.querySelector('.button-home').addEventListener('click', () => {
  Verification.input()
})
