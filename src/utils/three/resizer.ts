const setSize = (
  container: any,
  camera: any,
  renderer: any,
  composer?: any,
  updateResolutions?: (() => void) | null,
) => {
  if (!container) return

  const width = container.clientWidth
  const height = container.clientHeight
  const pixelRatio = Math.min(window.devicePixelRatio, 2)

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setPixelRatio(pixelRatio)
  renderer.setSize(width, height)
  if (composer) composer.setSize(width, height)
  if (updateResolutions) updateResolutions()
}

class Resizer {
  private resizeHandler: () => void

  constructor(
    container: any,
    camera: any,
    renderer: any,
    composer?: any,
    updateResolutions?: (() => void) | null,
  ) {
    this.resizeHandler = () => {
      setSize(container, camera, renderer, composer, updateResolutions)
      this.onResize()
    }

    window.addEventListener('resize', this.resizeHandler)
    setSize(container, camera, renderer, composer, updateResolutions)
  }

  dispose() {
    window.removeEventListener('resize', this.resizeHandler)
  }

  onResize() {}
}

export { Resizer, setSize }
