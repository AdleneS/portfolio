import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { setupModel } from './setupModel'
import * as THREE from 'three'

function disposeMaterial(material: THREE.Material | THREE.Material[]) {
  if (Array.isArray(material)) {
    material.forEach(item => item.dispose())
    return
  }

  material.dispose()
}

function disposeModel(model: THREE.Object3D) {
  model.traverse(child => {
    const mesh = child as THREE.Mesh

    if (mesh.geometry) mesh.geometry.dispose()
    if (mesh.material) disposeMaterial(mesh.material)
  })
}

async function loadCore(camera: any) {
  const loader = new GLTFLoader()

  const [twistData, rubbonData] = await Promise.all([
    loader.loadAsync('3d/twist.glb'),
    loader.loadAsync('3d/rubbon.glb'),
  ])

  document.addEventListener('mousemove', animateCore)
  let mouseX = 0
  let mouseY = 0
  const pointerVector = new THREE.Vector3()
  const pointerDirection = new THREE.Vector3()
  const pointerPosition = new THREE.Vector3()

  function animateCore(event: MouseEvent) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1
  }

  const twist = setupModel(twistData)

  const rubbon = setupModel(rubbonData)

  rubbon.name = 'rubbon'
  rubbon.scale.multiplyScalar(1.5)
  rubbon.position.set(2, 0.6, 0.5)
  rubbon.rotation.x = -0.7
  rubbon.rotation.z = -0.7
  rubbon.visible = false

  rubbon.tick = (delta: number) => {
    rubbon.rotateY((Math.PI / 2) * -0.0001 * delta)
  }

  twist.scale.set(0.2, 0.2, 0.2)

  twist.tick = () => {
    pointerVector.set(mouseX, mouseY, 0).unproject(camera)
    pointerDirection.copy(pointerVector).sub(camera.position).normalize()
    const distance = (3 - camera.position.z) / pointerDirection.z
    pointerPosition
      .copy(camera.position)
      .add(pointerDirection.multiplyScalar(distance))
    twist.position.set(pointerPosition.x, pointerPosition.y, 3)
    twist.rotation.z -= 0.001
    twist.rotation.y -= 0.001
  }
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0,
    transmission: 1, // effet verre
    thickness: 1,
    ior: 1.5,
    transparent: true,
  })
  twist.material = material
  // twist.material = Object.assign(new MeshTransmissionMaterialImpl(1), {
  //   clearCoat: 0.01,
  //   clearCoatRoughness: 1,
  //   chromaticAberration: 2,
  //   transmission: 1,
  //   roughness: 0.01,
  //   thickness: 0.5,
  //   ior: 1.5,
  //   time: 0,
  //   distortion: 1,
  //   distortionScale: 1,
  //   temporalDistortion: 0.2,
  // })

  twist.name = 'twist'

  const dispose = () => {
    document.removeEventListener('mousemove', animateCore)
    disposeModel(twist)
    disposeModel(rubbon)
  }

  return { twist, rubbon, dispose }
}

export { loadCore }
