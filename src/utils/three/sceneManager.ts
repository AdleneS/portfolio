import { watch } from 'vue'
import * as THREE from 'three'

export function updateScene(store: any, scene: THREE.Scene, bloomPass: any) {
  watch(
    () => store.currentPage,
    newValue => {
      setTimeout(() => {
        sceneModifier(newValue, scene, bloomPass)
      }, 750)
    },
  )
}

export function sceneModifier(value: number, scene: any, bloomPass: any) {
  switch (value) {
    case 1:
      scene.background = new THREE.Color(0x090909)
      scene.getObjectByName('background').visible = false
      scene.getObjectByName('name').visible = false
      // scene.getObjectByName('twist').visible = false
      scene.getObjectByName('surname').visible = false
      scene.getObjectByName('rubbon').visible = true
      bloomPass.strength = 0.6
      bloomPass.radius = 0.3
      break
    case 2:
      scene.background = new THREE.Color(0x090909)
      scene.getObjectByName('background').visible = false
      scene.getObjectByName('name').visible = false
      // scene.getObjectByName('twist').visible = false
      scene.getObjectByName('surname').visible = false
      scene.getObjectByName('rubbon').visible = false
      break
    default:
      scene.background = new THREE.Color(0x090909)
      scene.getObjectByName('background').visible = true
      scene.getObjectByName('name').visible = true
      // scene.getObjectByName('twist').visible = true
      scene.getObjectByName('surname').visible = true
      scene.getObjectByName('rubbon').visible = false
      bloomPass.strength = 0.3
      bloomPass.radius = 0
      break
  }
}
