if (window.DeviceMotionEvent) {
  console.log('DeviceMotionEvent available')
  window.addEventListener('devicemotion', evt =>
    handleAcceleration(evt.acceleration.z)
  )
} else {
  document.body.innerHTML = '<p>DeviceMotionEvent Not Supported</p>'
}

const images = [
  get('[data-js=rock]'),
  get('[data-js=paper]'),
  get('[data-js=scissors]'),
]

const insert = get('[data-js=insert]')
const btnRestart = get('[data-js=restart]')

btnRestart.addEventListener('click', reset)

let lastZ
let count = 0

function reset() {
  lastZ = undefined
  count = 0
  lastCount = -1
  images.forEach(hide)
  btnRestart.disabled = true
}

function hide(htmlEl) {
  htmlEl.classList.add('hidden')
}

function handleAcceleration(z) {
  if (z < 0 || !lastZ) {
    lastZ = z
    return
  }
  const dZ = Math.abs(Math.abs(lastZ) - Math.abs(z))
  if (dZ > 10) {
    count++
  }
  lastZ = z
}

window.requestAnimationFrame(function loop() {
  switch (count) {
    case 0:
      insert.innerHTML = 'SCHNICK'
      break
    case 1:
      insert.innerHTML = 'SCHNACK'
      break
    case 2:
      insert.innerHTML = 'SCHNUCK'
      break
    case 3:
      insert.innerHTML = ''
      showRockPaperScissors()
      count++
      btnRestart.disabled = false
      break
  }

  window.requestAnimationFrame(loop)
})

function showRockPaperScissors() {
  randomImage().classList.remove('hidden')
}

function randomImage() {
  return images[Math.floor(Math.random() * 3)]
}

function get(sel) {
  return document.querySelector(sel)
}
