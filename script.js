if (window.DeviceMotionEvent) {
  console.log('DeviceMotionEvent available')
  window.addEventListener('devicemotion', evt =>
    handleAcceleration(evt.acceleration.z)
  )
} else {
  document.body.innerHTML = '<p>DeviceMotionEvent Not Supported</p>'
}

//document.addEventListener('click', () => {
//  count++
//  shake = true
//})

const image = get('[data-js=image]')
const title = get('[data-js=title]')
const restart = get('[data-js=restart]')

image.addEventListener('animationend', () => restart.classList.remove('hidden'))
restart.addEventListener('click', reset)

let lastZ
let count = -1
let shake = false

function reset() {
  lastZ = undefined
  count = -1
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
    shake = true
  }
  lastZ = z
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
      break
  }
}

const images = ['img/paper.png', 'img/rock.png', 'img/scissors.png']

const INTERVAL = 750

let timeBefore = 0
window.requestAnimationFrame(function loop(time) {
  if (!timeBefore) {
    timeBefore = time
  } else {
    const delta_t = time - timeBefore
    if (delta_t >= INTERVAL && shake) {
      count++
      showResult()
      shake = false
      timeBefore = time
    }
  }

  window.requestAnimationFrame(loop)
})

function randomImage() {
  return images[Math.floor(Math.random() * 3)]
}

function get(sel) {
  return document.querySelector(sel)
}
