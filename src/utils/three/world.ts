import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js'
import { createCamera } from './camera'
import { createScene } from './scene'
import { createRenderer } from './renderer'
import { Resizer } from './resizer'
import { loadCore } from './core'
import { Loop } from './loop'
import { createText } from './text'
import { loadBackground } from './background'
import { sceneModifier } from './sceneManager'

export default class World {
  private camera: any
  private renderer: any
  private scene: THREE.Scene
  private background: any = null
  private loop: any
  private composer: any
  private bloomPass: any
  private resizer: Resizer
  private fxaaPass: any
  private core: any = null
  private renderSize = new THREE.Vector2()

  constructor(
    private container: Element,
    private scenePage = 0,
  ) {
    this.camera = createCamera()
    this.scene = createScene()
    this.renderer = createRenderer()
    this.composer = new EffectComposer(this.renderer)
    this.fxaaPass = new ShaderPass(FXAAShader)

    this.container.append(this.renderer.domElement)

    const renderPass = new RenderPass(this.scene, this.camera)
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0,
      0,
      1,
    )

    this.composer.addPass(renderPass)
    this.composer.addPass(this.bloomPass)
    this.composer.addPass(this.fxaaPass)

    this.renderer.autoClear = false
    this.bloomPass.clearColor = new THREE.Color(0xffffff)
    this.bloomPass.threshold = 0
    this.bloomPass.strength = 0.3
    this.bloomPass.radius = 0

    this.resizer = new Resizer(
      this.container,
      this.camera,
      this.renderer,
      this.composer,
      () => this.updateResolutions(),
    )

    this.loop = new Loop(this.camera, this.scene, this.renderer, this.composer)
  }

  private updateResolutions() {
    this.renderer.getDrawingBufferSize(this.renderSize)

    if (this.background?.material?.uniforms?.resolution) {
      if (typeof this.background.resize === 'function') {
        this.background.resize()
      } else {
        this.background.material.uniforms.resolution.value.set(
          this.renderSize.x,
          this.renderSize.y,
        )
      }
    }

    this.fxaaPass.material.uniforms.resolution.value.set(
      1 / this.renderSize.x,
      1 / this.renderSize.y,
    )

    if (this.bloomPass.resolution) {
      this.bloomPass.resolution.set(this.renderSize.x, this.renderSize.y)
    }
  }

  async init() {
    this.background = loadBackground(this.camera)
    const [core, name, surname] = await Promise.all([
      loadCore(this.camera),
      createText("hI, i'm AdlÈnE", 0.3, new THREE.Vector3(0, 0.2, 2), 'name'),
      createText(
        'fUll-StaCk deVelOpER',
        0.16,
        new THREE.Vector3(0, -0.1, 2),
        'surname',
      ),
    ])
    this.core = core
    const { twist, rubbon } = core

    this.loop.updatables.push(twist)
    this.loop.updatables.push(this.background)
    this.loop.updatables.push(name)
    this.loop.updatables.push(surname)
    this.loop.updatables.push(rubbon)

    this.scene.add(name, surname, rubbon, this.background, twist)
    sceneModifier(this.scenePage, this.scene, this.bloomPass)
    return this.scene
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  start() {
    this.loop.start()
  }

  stop() {
    this.loop.stop()
  }

  dispose() {
    this.stop()
    this.resizer.dispose()
    this.core?.dispose?.()
    this.background?.dispose?.()
    this.composer.dispose?.()
    this.renderer.dispose()
    this.renderer.domElement.remove()
  }
}
