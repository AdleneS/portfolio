import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import type { Font } from 'three/addons/loaders/FontLoader.js'
import * as THREE from 'three'
import textVertexShader from './shaders/vTextShader'
import textFragmentShader from './shaders/fTextShader'

const fontLoader = new FontLoader()
const textureLoader = new THREE.TextureLoader()
let fontPromise: Promise<Font> | null = null
let perlinTexture: THREE.Texture | null = null

function loadFont() {
  if (!fontPromise) {
    fontPromise = new Promise(resolve => {
      fontLoader.load('fonts/dirty.json', resolve)
    })
  }

  return fontPromise
}

function loadPerlinTexture() {
  if (!perlinTexture) {
    perlinTexture = textureLoader.load('images/perlin_noise.png')
    perlinTexture.wrapS = THREE.RepeatWrapping
    perlinTexture.wrapT = THREE.RepeatWrapping
    perlinTexture.repeat.set(4, 4)
  }

  return perlinTexture
}

async function createText(
  text: string,
  size: number,
  position: THREE.Vector3,
  objectName = '',
) {
  const texture = loadPerlinTexture()
  const threshold = 2.0
  const range = 0.2
  const animationSpeed = 0.0003

  const font = await loadFont()
  const geometry = new TextGeometry(text, {
    font,
    size,
    depth: 0,
    curveSegments: 10,
    bevelEnabled: false,
  })
  geometry.center()
  const matText = new THREE.ShaderMaterial({
    uniforms: {
      time: { type: 'f', value: 0 },
      perlinNoise: {
        type: 't',
        value: texture,
      },
      threshold: { type: 'f', value: threshold },
      range: { type: 'f', value: range },
      globalAlpha: { type: 'f', value: 1 },
    },
    vertexShader: textVertexShader(),
    fragmentShader: textFragmentShader(),
    transparent: true,
  })
  const mesh = new THREE.Mesh(geometry, matText)
  mesh.position.set(position.x, position.y, position.z)

  let isAnimationComplete = false
  mesh.tick = (delta: number) => {
    if (isAnimationComplete) return

    mesh.material.uniforms.threshold.value -= animationSpeed * delta
    if (mesh.material.uniforms.threshold.value <= 0) {
      mesh.material.uniforms.threshold.value = 0
      isAnimationComplete = true
    }
  }

  mesh.dispose = () => {
    mesh.geometry.dispose()
    mesh.material.dispose()
  }

  mesh.name = objectName
  return mesh
}

export { createText }
