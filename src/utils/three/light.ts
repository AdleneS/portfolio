import { PointLight, AmbientLight } from 'three'

function createLights() {
  const point = new PointLight(0xffffff, 0, 5)
  const point1 = new PointLight(0xffffff, 0, 20)
  const point2 = new PointLight(0xffffff, 0, 20)
  const point3 = new PointLight(0xffffff, 0, 5)
  const ambient = new AmbientLight(0xffffff, 0.1)

  point.position.set(0, 0, -3)
  point1.position.set(2, 1, 3)
  point2.position.set(-2, 1, 3)
  point3.position.set(0, 0, 3)

  return { ambient, point, point1, point2, point3 }
}

export { createLights }
