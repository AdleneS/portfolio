import * as THREE from 'three'
import vertexShader from './shaders/vBackgroundShader'
import fragmentShader from './shaders/fBackgroundShader'

function loadBackground(camera: THREE.PerspectiveCamera) {
  let mouseX = 0
  let mouseY = 0

  function mouse(event: MouseEvent) {
    mouseY = event.clientY
    mouseX = event.clientX
  }

  document.addEventListener('mousemove', mouse)

  const animationSpeed = 0.00005
  const getPlaneSize = () => {
    const verticalFov = THREE.MathUtils.degToRad(camera.fov)
    const height = camera.position.z * Math.tan(verticalFov / 2) * 2

    return {
      width: height * camera.aspect,
      height,
    }
  }
  const planeGeo = new THREE.PlaneGeometry(1, 1)
  const matBackground = new THREE.ShaderMaterial({
    uniforms: {
      time: { type: 'f', value: 0 },
      mouseX: { type: 'f', value: mouseX },
      mouseY: { type: 'f', value: mouseY },
      resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      globalAlpha: { type: 'f', value: 1 },
    },
    vertexShader: vertexShader(),
    fragmentShader: fragmentShader(),
    transparent: true,
  })
  const plane = new THREE.Mesh(planeGeo, matBackground)
  plane.name = 'background'
  plane.receiveShadow = true
  plane.position.set(0, 0, 0)

  function resizePlane() {
    const { width, height } = getPlaneSize()
    plane.scale.set(width, height, 1)
    plane.material.uniforms.resolution.value.set(
      window.innerWidth,
      window.innerHeight,
    )
  }

  plane.resize = resizePlane
  resizePlane()

  plane.tick = (delta: number) => {
    plane.material.uniforms.time.value += delta * animationSpeed
    plane.material.uniforms.mouseX.value = mouseX
    plane.material.uniforms.mouseY.value = mouseY
  }

  plane.dispose = () => {
    document.removeEventListener('mousemove', mouse)
    plane.geometry.dispose()
    plane.material.dispose()
  }

  return plane
}

export { loadBackground }
