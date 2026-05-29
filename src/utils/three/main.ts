import World from './world'

export default async function main() {
  const containers = Array.from(
    document.querySelectorAll<HTMLElement>('[data-three-scene]'),
  )

  if (!containers.length) return []
  const worlds = await Promise.all(
    containers.map(async container => {
      const scenePage = Number(container.dataset.threeScene ?? 0)
      const world = new World(container, scenePage)
      await world.init()
      world.start()
      return world
    }),
  )

  return worlds
}
