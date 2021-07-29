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
      this.alert()
    } else {
      saveInputs(
        parseInt(inputWork),
        parseInt(inputPause),
        parseInt(inputSections)
      )
    }
  },
  //ALERTA O USUÁRIO OS CAMPOS
  alert() {
    document.querySelector('.pomodoro').classList.add('alert')
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

// QUANDO O BOTÃO FOR CLICADO
document.querySelector('.button-home').addEventListener('click', () => {
  Verification.input()
})
