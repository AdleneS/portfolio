const setSize = (container: any, camera: any, renderer: any) => {
  camera.aspect = container?.clientWidth / container?.clientHeight
  camera.updateProjectionMatrix()

  renderer.setSize(container?.clientWidth, container?.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
}

class Resizer {
  constructor(container: any, camera: any, renderer: any) {
    // set initial size on load
    window.addEventListener('resize', () => {
      // set the size again if a resize occurs
      setSize(container, camera, renderer)
      this.onResize()
    })
    setSize(container, camera, renderer)
  }

  onResize() {}
}

export { Resizer, setSize }
