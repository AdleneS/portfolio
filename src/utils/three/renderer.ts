import { WebGLRenderer } from 'three'

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true })

  // renderer.physicallyCorrectLights = true
  renderer.setClearColor(0x000000, 0) // the default
  return renderer
}

export { createRenderer }
