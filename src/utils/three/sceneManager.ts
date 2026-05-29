import * as THREE from 'three'

const black = new THREE.Color(0x090909)

function setMaterialOpacity(
  material: THREE.Material | THREE.Material[],
  opacity: number,
) {
  if (Array.isArray(material)) {
    material.forEach(item => setMaterialOpacity(item, opacity))
    return
  }

  const shaderMaterial = material as THREE.ShaderMaterial
  if (shaderMaterial.uniforms?.globalAlpha) {
    shaderMaterial.uniforms.globalAlpha.value = opacity
  } else {
    material.opacity = opacity
  }

  material.transparent = opacity < 1
}

function showObject(object: THREE.Object3D | undefined, visible: boolean) {
  if (!object) return

  object.visible = visible
  object.traverse(child => {
    const mesh = child as THREE.Mesh
    if (mesh.material) setMaterialOpacity(mesh.material, visible ? 1 : 0)
  })
}

export function sceneModifier(page: number, scene: any, bloomPass: any) {
  const background = scene.getObjectByName('background')
  const name = scene.getObjectByName('name')
  const twist = scene.getObjectByName('twist')
  const surname = scene.getObjectByName('surname')
  const rubbon = scene.getObjectByName('rubbon')

  scene.background = black

  showObject(background, page === 0)
  showObject(name, page === 0)
  showObject(twist, page === 0)
  showObject(surname, page === 0)
  showObject(rubbon, page === 1)

  bloomPass.strength = page === 1 ? 0.6 : page === 0 ? 0.3 : 0
  bloomPass.radius = page === 1 ? 0.3 : 0
}
