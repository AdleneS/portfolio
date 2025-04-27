import World from './world'

export default function main(store: any) {
  const container = document.querySelector('#scene-container')
  if (!container) return Promise.resolve(null)

  const world = new World(container, store)
  const scenePromise = world.init().then(scene => {
    world.start()
    return scene
  })

  return scenePromise
}
