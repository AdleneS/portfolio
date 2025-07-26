const setSize = (
  container: any,
  camera: any,
  renderer: any,
  composer?: any,
  updateResolutions?: (() => void) | null,
) => {
  camera.aspect = container?.clientWidth / container?.clientHeight
  camera.updateProjectionMatrix()
  if (composer) composer.setSize(container.clientWidth, container.clientHeight)
  renderer.setSize(container?.clientWidth, container?.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
}

class Resizer {
  constructor(
    container: any,
    camera: any,
    renderer: any,
    composer?: any,
    updateResolutions?: (() => void) | null,
  ) {
    // set initial size on load
    window.addEventListener('resize', () => {
      // set the size again if a resize occurs
      setSize(container, camera, renderer, composer, updateResolutions)
      this.onResize()
    })
    setSize(container, camera, renderer, composer, updateResolutions)
  }

  onResize() {}
}

export { Resizer, setSize }
