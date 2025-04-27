import {
  BufferGeometry,
  BufferAttribute,
  Points,
  PointsMaterial,
  Clock,
} from 'three'

import * as THREE from 'three'

function createParticles() {
  const particlesCnt = 2500
  const posArray = new Float32Array(particlesCnt * 3)
  const particlesGeometry = new BufferGeometry()
  for (let i = 0; i < particlesCnt * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * Math.random() * 20
  }

  const material = new PointsMaterial({
    size: 0.01,
  })
  particlesGeometry.setAttribute('position', new BufferAttribute(posArray, 3))
  const particlesMesh = new Points(particlesGeometry, material)

  particlesMesh.position.z = -5
  const clock = new Clock()
  document.addEventListener('mousemove', animateParticles)
  let mouseX = 0
  let mouseY = 0

  function animateParticles(event: any) {
    mouseY = event.clientY
    mouseX = event.clientX
  }

  particlesMesh.tick = () => {
    let timer = 0
    const speed = 0.01
    const deltaTime = clock.getDelta()
    timer += clock.getDelta()
    particlesMesh.rotation.x += speed * deltaTime
    particlesMesh.rotation.y += speed * deltaTime
    if (
      mouseX > 0 &&
      mouseY > 0 &&
      mouseX < innerWidth - 50 &&
      mouseY < innerHeight
    ) {
      particlesMesh.rotation.x += (mouseY - innerHeight / 2) * 0.001 * deltaTime
      particlesMesh.rotation.y += (mouseX - innerWidth / 2) * 0.001 * deltaTime
    }
  }
  return particlesMesh
}

export { createParticles }
