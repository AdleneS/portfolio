import * as THREE from 'three'

function createScene(): THREE.Scene {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  const texture = new THREE.TextureLoader().load('images/environment.jpg')
  texture.minFilter = THREE.LinearFilter
  texture.colorSpace = THREE.SRGBColorSpace

  // texture.wrapS = THREE.RepeatWrapping
  // texture.wrapT = THREE.RepeatWrapping
  texture.mapping = THREE.EquirectangularReflectionMapping

  scene.environment = texture

  // scene.background = null
  return scene
}

export { createScene }
