if (window.DeviceMotionEvent) {
  console.log('DeviceMotionEvent available')
  window.addEventListener('devicemotion', evt =>
    handleAcceleration(evt.acceleration.z)
  )
} else {
  document.body.innerHTML = '<p>DeviceMotionEvent Not Supported</p>'
}

document.addEventListener('click', () => {
  count++
  showResult()
})

const image = get('[data-js=image]')
const title = get('[data-js=title]')
const restart = get('[data-js=restart]')

restart.addEventListener('click', reset)

image.addEventListener('animationend', () => {
  restart.classList.remove('hidden')
})

let lastZ
let count = -1

function reset() {
  lastZ = undefined
  count = -2
  image.classList.add('hidden')
  restart.classList.add('hidden')
  title.textContent = '3 x schütteln'
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
  showResult()
}

function showResult() {
  switch (count) {
    case 0:
      title.textContent = 'Schnick..'
      break
    case 1:
      title.textContent = '..Schnack..'
      break
    case 2:
      title.textContent = '..Schnuck!'
      image.src = randomImage()
      image.className = 'spin-in'
      count++
      break
  }
}

const images = ['img/paper.png', 'img/rock.png', 'img/scissors.png']

function randomImage() {
  return images[Math.floor(Math.random() * 3)]
}

function get(sel) {
  return document.querySelector(sel)
}
