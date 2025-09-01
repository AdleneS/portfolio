class Loop {
  private camera
  private scene
  private renderer
  private composer
  private then = Date.now()
  public updatables: any
  public delta = 0
  constructor(camera: any, scene: any, renderer: any, composer: any) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
    this.composer = composer
    this.updatables = []
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      const now = Date.now()
      this.delta = now - this.then
      this.then = now
      this.tick()
      this.composer.render(this.scene, this.camera)
      // this.renderer.render(this.scene, this.camera)
    })
  }

  stop() {
    this.renderer.setAnimationLoop(null)
  }

  tick() {
    for (const object of this.updatables) {
      if (typeof object.tick === 'function') {
        object.tick(this.delta)
      }
    }
  }
}

export { Loop }
