import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { setupModel } from './setupModel'
import MeshTransmissionMaterialImpl from './meshMaterial'
import * as THREE from 'three'

async function loadCore(camera: any) {
  const loader = new GLTFLoader()

  const [twistData, rubbonData] = await Promise.all([
    await loader.loadAsync('src/assets/twist.glb'),
    await loader.loadAsync('src/assets/rubbon.glb'),
  ])

  document.addEventListener('mousemove', animateCore)
  let mouseX = 0
  let mouseY = 0

  function animateCore(event: any) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1
  }

  const twist = setupModel(twistData)

  const rubbon = setupModel(rubbonData)

  rubbon.position.set(0, 10, 0)
  rubbon.name = 'rubbon'

  rubbon.rotation.x = -0.7
  rubbon.rotation.z = -0.7

  rubbon.tick = () => {
    rubbon.rotateY((Math.PI / 2) * -0.001)
  }

  twist.scale.set(0.1, 0.1, 0.1)
  twist.tick = () => {
    const vector = new THREE.Vector3(mouseX, mouseY, 0)
    vector.unproject(camera)
    const dir = vector.sub(camera.position).normalize()
    const distance = -camera.position.z / dir.z
    const pos = camera.position.clone().add(dir.multiplyScalar(distance))
    twist.position.set(pos.x, pos.y, 0)
    twist.rotation.z -= 0.001
    twist.rotation.y -= 0.001
  }

  twist.material = Object.assign(new MeshTransmissionMaterialImpl(6), {
    clearCoat: 0.01,
    clearCoatRoughness: 1,
    chromaticAberration: 2,
    transmission: 1,
    roughness: 0.01,
    thickness: 0.5,
    ior: 1.5,
    time: 0,
    distortion: 1,
    distortionScale: 1,
    temporalDistortion: 0.2,
  })
  twist.name = 'twist'

  return { twist, rubbon }
}

export { loadCore }
