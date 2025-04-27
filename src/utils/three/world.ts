import { createCamera } from './camera'
import { createScene } from './scene'
import { createRenderer } from './renderer'
import { Resizer, setSize } from './resizer'
import * as THREE from 'three'
import { loadCore } from './core'
import { createLights } from './light'
import { animate } from './animate'
import { Loop } from './loop'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js'
// import { GUI } from 'dat.gui'
import { createParticles } from './particles'
import { createText } from './text'
import { loadBackground } from './background'
import { updateScene } from './sceneManager'

let camera: any
let renderer: any
let scene: THREE.Scene
let light: any
let loop: any
let composer: any
let bloomPass: any
let store: any
const bloom = { strength: 0, radius: 0, threshold: 0 }
// const gui = new GUI()
// let particles: any

export default class World {
  constructor(container: Element | null, piniaStore: any) {
    store = piniaStore
    camera = createCamera()
    scene = createScene()
    renderer = createRenderer()
    // particles = createParticles()
    container?.append(renderer.domElement)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container?.clientWidth, container?.clientHeight)
    composer = new EffectComposer(renderer)
    const fxaaPass = new ShaderPass(FXAAShader)
    const renderPass = new RenderPass(scene, camera)
    const pixelRatio = renderer.getPixelRatio()
    const uniforms = fxaaPass.material.uniforms
    uniforms.resolution = {
      value: new THREE.Vector2(
        1 / (window.innerWidth * pixelRatio),
        1 / (window.innerHeight * pixelRatio),
      ),
    }

    composer.addPass(renderPass)
    // renderer.autoClear = false
    // renderer.autoClearDepth = false

    bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0,
      0,
      1,
    )
    composer.addPass(bloomPass)
    composer.addPass(fxaaPass)
    bloomPass.clearColor = new THREE.Color(0xffffff)
    // gui.add(bloom, 'threshold', 0.0, 1.0).onChange(function (value: any) {
    //   bloomPass.threshold = Number(value)
    // })
    // gui.add(bloom, 'radius', 0.0, 10.0).onChange(function (value: any) {
    //   bloomPass.radius = Number(value)
    // })
    // gui.add(bloom, 'strength', 0.0, 10.0).onChange(function (value: any) {
    //   bloomPass.strength = Number(value)
    // })
    bloomPass.threshold = 0
    bloomPass.strength = 0.3
    bloomPass.radius = 0

    const resizer = new Resizer(container, camera, renderer)

    loop = new Loop(camera, scene, renderer, composer)
  }

  async init() {
    const { twist, rubbon } = await loadCore(camera)
    const background = loadBackground()
    const name = await createText(
      "hI, i'm AdlÈnE",
      0.3,
      new THREE.Vector3(0, 0.2, -2),
      'name',
    )
    const surname = await createText(
      'fUll-StaCk deVelOpER',
      0.16,
      new THREE.Vector3(0, -0.1, -2),
      'surname',
    )

    updateScene(store, scene, bloomPass)

    loop.updatables.push(twist)
    loop.updatables.push(background)
    loop.updatables.push(name)
    loop.updatables.push(surname)
    loop.updatables.push(rubbon)

    const light = createLights()
    scene.add(
      light.point,
      twist,
      light.ambient,
      light.point1,
      light.point2,
      light.point3,
      name,
      surname,
      rubbon,
      background,
    )
    return scene
  }

  render() {
    renderer.render(scene, camera)
  }

  start() {
    loop.start()
  }

  stop() {
    loop.stop()
  }
}
