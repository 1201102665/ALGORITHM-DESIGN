import { writeFileSync, readFileSync } from 'fs'
import { join } from 'path'

export type Route = [number, number, number]

export class Star {
  i: number
  point: Point
  weight: number
  profit: number

  constructor(i: number, point: Point, weight: number, profit: number) {
    this.i = i
    this.point = point
    this.weight = weight
    this.profit = profit
  }

  get name() {
    return String.fromCharCode('A'.charCodeAt(0) + this.i)
  }

  distanceTo(star: Star) {
    return this.point.distanceTo(star.point)
  }
}

export class Point {
  x: number
  y: number
  z: number

  constructor(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }

  distanceTo(point: Point) {
    const x = point.x - this.x
    const y = point.y - this.y
    const z = point.z - this.z

    const sum = Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2)
    return Math.round(Math.sqrt(sum))
  }
}

export function writeStars(stars: Star[]) {
  const content = stars.map((s) => `${s.i},${s.point.x},${s.point.y},${s.point.z},${s.weight},${s.profit}`).join('\n')
  writeFileSync(join(__dirname, 'sets/stars.txt'), content, { encoding: 'utf-8' })
}
export function readStars() {
  const content = readFileSync(join(__dirname, 'sets/stars.txt'), { encoding: 'utf-8' })
  const lines = content.split('\n')
  const stars: Star[] = []

  for (const l of lines) {
    const [i, x, y, z, weight, profit] = l.split(' ')
    stars.push(new Star(parseInt(i), new Point(parseInt(x), parseInt(y), parseInt(z)), parseInt(weight), parseInt(profit)))
  }

  return stars
}

export function writeRoutes(routes: [number, number, number][]) {
  const content = routes.map((r) => r.join(',')).join('\n')
  writeFileSync(join(__dirname, 'sets/routes.txt'), content, { encoding: 'utf-8' })
}
export function readRoutes() {
  const content = readFileSync(join(__dirname, 'sets/routes.txt'), { encoding: 'utf-8' })
  const lines = content.split('\n')
  const routes: [number, number, number][] = []

  for (let i = 0; i < lines.length; i++) {
    const [from, to, distance] = lines[i].split(',')
    routes.push([parseInt(from), parseInt(to), parseInt(distance)])
  }

  return routes
}
