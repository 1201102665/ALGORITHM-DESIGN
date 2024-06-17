import { Star, Point, writeStars, writeRoutes, Route } from './helper'

// Allowed digits based on non-leader members' ID
const id = 1221302021 + 1201102665 + 1221301330
const digits = Array.from(String(id), Number)

export default () => {
  const starCount = 20
  const routeCount = 54

  const stars = generateStars(starCount)
  const routes = generateRoutes(stars, routeCount)

  writeStars(stars)
  writeRoutes(routes)

  const obj = {}
  for (let r of routes) {
    const [from, to] = r

    if (obj[from] === undefined) obj[from] = 0
    else obj[from]++

    if (obj[to] === undefined) obj[to] = 0
    else obj[to]++
  }
  console.log(obj)
}

function generateStars(size: number) {
  const stars: Star[] = []
  for (let i = 0; i < size; i++) stars.push(generateStar(i))
  return stars

  function generateStar(i: number) {
    const point = new Point(randNum(3), randNum(3), randNum(3))
    return new Star(i, point, randNum(3), randNum(3))

    function randNum(digitCount: number) {
      return parseInt(Array.from({ length: digitCount }, () => digits[Math.floor(Math.random() * digits.length)]).join(''))
    }
  }
}

function generateRoutes(stars: Star[], routeCount: number): Route[] {
  const routes: Route[] = []
  for (let i = 0; i < stars.length; i++) {
    const distArr = stars.map((s, j) => ({ index: j, dist: stars[i].distanceTo(s) })).sort((a, b) => a.dist - b.dist)
    for (let j = 1; j <= 3; j++) routes.push([i, distArr[j].index, distArr[j].dist])
  }
  return routes.slice(0, routeCount)
}
