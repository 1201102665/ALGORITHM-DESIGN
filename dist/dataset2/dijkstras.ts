import { Star, readRoutes, readStars } from './helper'

type PathNode = {
  i: number
  prev: number | null
  dist: number
}

export default (startI: number = 0) => {
  const nodes = toNodes(readStars())
  const routes = readRoutes()
  const table = buildTable(nodes, routes, startI)

  console.log('📢 ------------------------------------------📢')
  console.log('📢 | file: dijkstras.ts:28 | nodes:', nodes.map((n) => [n.i, n.dist, n.prev].join(',')).join('\n'))
  console.log('📢 ------------------------------------------📢')

  console.log('📢 ------------------------------------------📢')
  for (let i = 0; i < nodes.length; i++) {
    const path = getShortestPath(table, startI, i)
    console.log(`📢 shortest path from ${startI} to ${i}:`, path)
  }
  console.log('📢 ------------------------------------------📢')
}

function toNodes(stars: Star[]): PathNode[] {
  return stars.map((s) => ({
    i: s.i,
    prev: null,
    dist: Infinity
  }))
}

function getNeighbours(i: number, routes: [number, number, number][], visited: number[]) {
  const neighbours: [number, number][] = []
  for (const [from, to, dist] of routes) {
    if (from === i && !visited.includes(to)) neighbours.push([to, dist])
    else if (to === i && !visited.includes(from)) neighbours.push([from, dist])
  }
  return neighbours
}

function buildTable(nodes: PathNode[], routes: [number, number, number][], startI: number) {
  let unvisited = new Set<PathNode>(nodes)
  const visited: PathNode[] = []

  const n = nodes[startI]
  n.dist = 0
  visit(n)

  while (unvisited.size > 0) {
    const node = unvisited.values().next().value
    visit(node)
  }

  return nodes

  function visit(node: PathNode) {
    const neighbours = getNeighbours(
      node.i,
      routes,
      visited.map((n) => n.i)
    )
    for (const [neighbour, dist] of neighbours) {
      const alt = node.dist + dist
      if (alt < nodes[neighbour].dist) {
        nodes[neighbour].dist = alt
        nodes[neighbour].prev = node.i
      }
    }

    visited.push(node)
    unvisited.delete(node)

    const arr = Array.from(unvisited)
    arr.sort((a, b) => a.dist - b.dist)
    unvisited = new Set(arr)
  }
}

function getShortestPath(table: PathNode[], startI: number, endI: number) {
  const path: number[] = []
  let node = table[endI]

  while (node.i !== startI) {
    path.push(node.i)
    node = table[node.prev!]
  }

  path.push(startI)
  return path.reverse()
}
