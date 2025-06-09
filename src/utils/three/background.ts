import * as THREE from 'three'
import vertexShader from './shaders/vBackgroundShader'
import fragmentShader from './shaders/fBackgroundShader'

function loadBackground(camera: THREE.PerspectiveCamera) {
  document.addEventListener('mousemove', mouse)
  let mouseX = 0
  let mouseY = 0

  function mouse(event: any) {
    mouseY = event.clientY
    mouseX = event.clientX
  }

  const angrad = (camera.fov * Math.PI) / 180
  const fovy = camera.position.z * Math.tan(angrad / 2) * 2
  const planeGeo = new THREE.PlaneGeometry(fovy * camera.aspect, fovy)
  // const planeGeo = new THREE.PlaneGeometry(12, 6)
  const timer = 0.0
  const matBackground = new THREE.ShaderMaterial({
    uniforms: {
      time: { type: 'f', value: timer },
      mouseX: { type: 'f', value: mouseX },
      mouseY: { type: 'f', value: mouseY },
      resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    },
    vertexShader: vertexShader(),
    fragmentShader: fragmentShader(),
  })
  const plane = new THREE.Mesh(planeGeo, matBackground)
  plane.name = 'background'
  plane.receiveShadow = true
  plane.position.x = 0
  plane.position.y = 0
  plane.position.z = 0
  // plane.position.z = -4
  plane.tick = () => {
    plane.material.uniforms.time.value += 0.0005
    plane.material.uniforms.mouseX.value = mouseX
    plane.material.uniforms.mouseY.value = mouseY
  }
  return plane
}

export { loadBackground }
