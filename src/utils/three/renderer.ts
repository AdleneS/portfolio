import { WebGLRenderer } from 'three'

function createRenderer() {
  const renderer = new WebGLRenderer({
    antialias: false,
    alpha: true,
    powerPreference: 'high-performance',
  })

  // renderer.physicallyCorrectLights = true
  renderer.setClearColor(0x000000, 0) // the default
  return renderer
}

export { createRenderer }
