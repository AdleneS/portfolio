class Loop {
  private camera
  private scene
  private renderer
  public updatables: any
  private composer
  constructor(camera: any, scene: any, renderer: any, composer: any) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
    this.composer = composer
    this.updatables = []
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick()
      // this.renderer.render(this.scene, this.camera)
      this.composer.render(this.scene, this.camera)
    })
  }

  stop() {
    this.renderer.setAnimationLoop(null)
  }

  tick() {
    for (const object of this.updatables) {
      object.tick()
    }
  }
}

export { Loop }
