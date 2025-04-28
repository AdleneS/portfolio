import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import * as THREE from 'three'
import textVertexShader from './shaders/vTextShader'
import textFragmentShader from './shaders/fTextShader'

async function createText(
  text: string,
  size: number,
  position: THREE.Vector3,
  objectName = '',
  color = '#FFFFFF',
) {
  const loader = new FontLoader()
  const texture = new THREE.TextureLoader().load('images/perlin_noise.png')
  const timer = 0
  const threshold = 2.0
  const range = 0.2

  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(4, 4)
  // const font = loader.load('fonts/Aesthetic_Regular.json')
  const font = await new Promise(resolve =>
    loader.load('fonts/dirty.json', resolve),
  )
  const geometry = new TextGeometry(text, {
    font: font,
    size: size,
    depth: 0,
    curveSegments: 10,
    bevelEnabled: false,
  })
  geometry.center()
  const matText = new THREE.ShaderMaterial({
    uniforms: {
      time: { type: 'f', value: timer },
      perlinNoise: {
        type: 't',
        value: texture,
      },
      threshold: { type: 'f', value: threshold },
      range: { type: 'f', value: range },
    },
    vertexShader: textVertexShader(),
    fragmentShader: textFragmentShader(),
    transparent: true,
  })
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    color: color,
    reflectivity: 10,
    refractionRatio: 0,
  })
  const mesh = new THREE.Mesh(geometry, matText)
  mesh.position.set(position.x, position.y, position.z)
  mesh.tick = () => {
    mesh.material.uniforms.threshold.value -= 0.003
    if (mesh.material.uniforms.threshold.value <= 0)
      mesh.material.transparent = false
    // mesh.material.uniforms.range.value -= 0.001
  }
  mesh.name = objectName
  return mesh
}

export { createText }
