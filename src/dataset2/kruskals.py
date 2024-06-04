from typing import List, Tuple
from helper import Star, read_file

class Node():
    key: int | str
    parent: object
    parent_w: int
    rank: int

    def __init__(self, key: int | str):
        self.key = key
        self.parent = self
        self.rank = 0
        self.parent_w = 0

class Tree():
    nodes: dict

    def __init__(self, stars: List[Star]):
        self.nodes = {s.name: Node(s.name) for s in stars}

    def find_set(self, x: Node):
        if self.nodes[x] != self.nodes[x].parent:
            self.nodes[x].parent = self.find_set(self.nodes[x].parent.key)
        return self.nodes[x].parent
    
    def union(self, x: Node, y: Node, w: int):
        self.link(self.find_set(x), self.find_set(y), w)

    def link(self, x: Node, y: Node, w: int):
        if (x.rank > y.rank):
            y.parent = x
            y.parent_w = w
        else:
            x.parent = y
            x.parent_w = w
            if (x.rank == y.rank):
                y.rank += 1

    def as_array(self):
        arr = []
        for node in self.nodes.values():
            if node != node.parent:
                arr.append((node.parent.key, node.key, node.parent_w))
        return arr

def to_edges(stars: List[Star]):
    edges: List[Tuple[str, str, int]] = []
    for star in stars:
        for star_i in star.routes:
            edges.append((star.name, stars[star_i].name, stars[star_i].weight))
    return edges

def get_mst(stars: List[Star], edges: List[Tuple[str, str, int]]):
    edges.sort(key=lambda e: e[2])
    tree = Tree(stars)

    num_edges = 0
    i = 0

    while num_edges < len(stars) - 1:
        u, v, w = edges[i]
        i += 1
        if tree.find_set(u) != tree.find_set(v):
            num_edges += 1
            tree.union(u, v, w)

    return tree

def main():
    stars = sorted(read_file(), key=lambda x: x.weight, reverse=True)
    edges = to_edges(stars)

    tree = get_mst(stars, edges)
    tree_edges = tree.as_array()
    print(tree_edges)

if __name__ == '__main__':
    main()