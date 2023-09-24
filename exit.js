const exitPopupElement = document.getElementById('exit-popup')
const closeButton = document.getElementById('close-popup')

const isFormVisible = () => {
  const form = document.querySelector('.form')
  const checkDisplay = window.getComputedStyle(form).display
  if (checkDisplay === 'block' || checkDisplay === 'flex') {
    setCookie('formSeen', true, 30)
    return true
  }

  return false
}

const validateExitPopup = () => {
  if (
    checkCookie('formSeen') &&
    !checkCookie('exitPopupShown') &&
    !checkCookie('closedExitPopup')
  ) {
    showExitPopup()
    setCookie('exitPopupShown', true, 30)
  }
}

const showExitPopup = () => {
  exitPopupElement.style.display = 'block'
}

// Close Popup
const closePopup = () => {
  exitPopupElement.style.display = 'none'
  setCookie('closedExitPopup', true, 30)
}

// setCookie function
function setCookie(cookieName, cookieValue, exdays) {
  const d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  let expires = 'expires=' + d.toUTCString()
  document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/'
}

// getCookie function
function getCookie(cookieName) {
  let name = cookieName + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  console.log(decodedCookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

function checkCookie(cookieName) {
  let cookieValue = getCookie(cookieName)
  return cookieValue !== ''
}

window.addEventListener('DOMContentLoaded', isFormVisible)
document.addEventListener('mouseleave', validateExitPopup)
closeButton.addEventListener('click', closePopup)
