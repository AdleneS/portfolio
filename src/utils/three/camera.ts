import * as THREE from 'three'

function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    60, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    1000, // far clipping plane
  )

  // move the camera back so we can view the scene
  camera.position.set(0, 0, 1)
  // let time = 0
  // camera.tick = () => {
  //   time += 0.0001
  //   console.log('camera')
  //   camera.position.lerp(new THREE.Vector3(0, 1, 4), time)
  // }
  //

  /*  CHANGER LA SCENE AU SCROLL */

  // document.addEventListener('wheel', cameraZoom)
  // function cameraZoom(event: any) {
  //   console.log(event.deltaY)
  //   const x = event.deltaY > 0 ? 1 : -1
  //   const zoomStrength = 0.5
  //   camera.position.z += x * zoomStrength
  // }

  return camera
}

export { createCamera }
