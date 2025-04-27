import { watch } from 'vue'
import * as THREE from 'three'

export function updateScene(store: any, scene: THREE.Scene, bloomPass: any) {
  watch(
    () => store.currentPage,
    newValue => {
      setTimeout(() => {
        sceneModifier(newValue, scene, bloomPass)
      }, 1500)
    },
  )
}

export function sceneModifier(value: number, scene: any, bloomPass: any) {
  switch (value) {
    case 1:
      scene.background = new THREE.Color(0x090909)
      scene.getObjectByName('background').position.set(10, 10, 10)
      scene.getObjectByName('name').position.set(10, 10, 10)
      scene.getObjectByName('surname').position.set(10, 10, 10)
      scene.getObjectByName('twist').scale.set(0, 0, 0)
      scene.getObjectByName('rubbon').position.set(1.5, 0.4, -2)
      bloomPass.strength = 0.6
      bloomPass.radius = 0.3
      break
    case 2:
      scene.background = new THREE.Color(0x090909)
      scene.getObjectByName('background').position.set(10, 10, 10)
      scene.getObjectByName('name').position.set(10, 10, 10)
      scene.getObjectByName('surname').position.set(10, 10, 10)
      scene.getObjectByName('rubbon').position.set(1.5, 10, -2)
      scene.getObjectByName('twist').scale.set(0, 0, 0)
      break
    default:
      scene.background = new THREE.Color(0x090909)
      scene.getObjectByName('background').position.set(0, 0, -4)
      scene.getObjectByName('name').position.set(0, 0.2, -2)
      scene.getObjectByName('surname').position.set(0, -0.1, -2)
      scene.getObjectByName('rubbon').position.set(1.5, 10, -2)
      scene.getObjectByName('twist').scale.set(0.1, 0.1, 0.1)
      bloomPass.strength = 0.3
      bloomPass.radius = 0
      break
  }
}
