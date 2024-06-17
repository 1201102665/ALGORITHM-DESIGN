import { Route, readRoutes } from './helper'

class TreeNode {
  i: number
  rank: number
  parent: TreeNode

  // Disjoint Set Node to store the parent and rank
  constructor(i: number) {
    this.i = i
    this.parent = this
    this.rank = 0
  }
}

export default () => {
  const routes = readRoutes()
  routes.sort((a, b) => a[2] - b[2])

  const nodes = toNodes(routes)
  const mst = KruskalMST(routes, nodes)

  console.log('📢 ------------------------------------📢')
  console.log('📢 mst:', mst.map(([u, v, w]) => `Node1: ${u}, Node2: ${v}, Weight: ${w}`).join('\n'))
  console.log('📢 ------------------------------------📢')

  console.log('📢 ------------------------------------📢')
  console.log('📢 Adjacency Matrix:')
  mst.forEach((row) => console.log(row.join(',')))
  console.log('📢 ------------------------------------📢')
}

function KruskalMST(routes: Route[], nodes: { [node: number]: TreeNode }) {
  const mst: Route[] = []
  // const maxNode = Math.max(...routes.flatMap((r) => [r[0], r[1]]))
  // const adjacencyMatrix = Array(maxNode + 1)
  //   .fill(null)
  //   .map(() => Array(maxNode + 1).fill(0))

  let index = 0
  while (mst.length < 19) {
    const [u, v, w] = routes[index]
    index += 1

    if (find(u, nodes) !== find(v, nodes)) {
      union(u, v, nodes)
      mst.push([u, v, w])
      // adjacencyMatrix[u][v] = w
      // adjacencyMatrix[v][u] = w
    }
  }

  // return adjacencyMatrix
  return mst
}

function toNodes(routes: Route[]) {
  const nodes = {}
  for (const [i, j] of routes) {
    nodes[i] = new TreeNode(i)
    nodes[j] = new TreeNode(j)
  }
  return nodes
}

// Function to find the set x belongs to (with path-compression)
function find(n: number, nodes: { [node: number]: TreeNode }) {
  if (nodes[n] !== nodes[n].parent) nodes[n].parent = find(nodes[n].parent.i, nodes)
  return nodes[n].parent
}

// Function to merge 2 disjoint sets
function union(n1: number, n2: number, nodes: { [node: number]: TreeNode }) {
  const root1 = find(n1, nodes)
  const root2 = find(n2, nodes)

  if (root1.rank > root2.rank) {
    root2.parent = root1
  } else {
    root1.parent = root2
    if (root1.rank === root2.rank) root2.rank += 1
  }
}
