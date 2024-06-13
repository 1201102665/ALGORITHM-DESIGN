from typing import List, Tuple
from helper import Star, read_file

# Node class for the disjoint set
class Node():
    key: int | str
    parent: object
    parent_w: int
    rank: int

    def __init__(self, key: int | str):
        """Initialize a node with a key, parent, rank, and parent weight."""
        self.key = key
        self.parent = self  # Node is initially its own parent
        self.rank = 0  # Rank is initially 0
        self.parent_w = 0  # Weight to parent is initially 0

# Disjoint set data structure
class Tree():
    nodes: dict

    def __init__(self, stars: List[Star]):
        """Initialize the disjoint set with nodes for each star."""
        # Create a node for each star
        self.nodes = {s.name: Node(s.name) for s in stars}

    def find_set(self, x: Node):
        """Find the representative of the set that x belongs to."""
        # If x is not its own parent, update its parent to the representative of its set
        if self.nodes[x] != self.nodes[x].parent:
            self.nodes[x].parent = self.find_set(self.nodes[x].parent.key)
        return self.nodes[x].parent
    
    def union(self, x: Node, y: Node, w: int):
        """Merge the sets that x and y belong to."""
        # Link the representatives of the sets that x and y belong to
        self.link(self.find_set(x), self.find_set(y), w)

    def link(self, x: Node, y: Node, w: int):
        """Link two nodes together."""
        # If x's rank is greater than y's rank, make x the parent of y
        if (x.rank > y.rank):
            y.parent = x
            y.parent_w = w
        else:
            # Otherwise, make y the parent of x and increment y's rank if x's rank is equal to y's rank
            x.parent = y
            x.parent_w = w
            if (x.rank == y.rank):
                y.rank += 1

    def as_array(self):
        """Return the tree as an array of edges."""
        arr = []
        # For each node, if it is not its own parent, add an edge from it to its parent
        for node in self.nodes.values():
            if node != node.parent:
                arr.append((node.parent.key, node.key, node.parent_w))
        return arr

def to_edges(stars: List[Star]):
    """Convert the list of stars to a list of edges."""
    edges: List[Tuple[str, str, int]] = []
    # For each star, for each route, add an edge from the star to the route
    for star in stars:
        for star_i in star.routes:
            edges.append((star.name, stars[star_i].name, stars[star_i].weight))
    return edges

def get_mst(stars: List[Star], edges: List[Tuple[str, str, int]]):
    """Get the minimum spanning tree of the graph."""
    # Sort the edges by weight
    edges.sort(key=lambda e: e[2])
    tree = Tree(stars)

    num_edges = 0
    i = 0

    # While there are fewer than n - 1 edges in the tree
    while num_edges < len(stars) - 1:
        # Get the next edge
        u, v, w = edges[i]
        i += 1
        # If the sets that u and v belong to are different, merge them and increment the number of edges
        if tree.find_set(u) != tree.find_set(v):
            num_edges += 1
            tree.union(u, v, w)

    return tree

def main():
    """Main function to read the file, convert to edges, get the MST, and print the edges of the MST."""
    # Read the file and sort the stars by weight in descending order
    stars = sorted(read_file(), key=lambda x: x.weight, reverse=True)
    # Convert the stars to edges
    edges = to_edges(stars)

    # Get the minimum spanning tree
    tree = get_mst(stars, edges)
    # Convert the tree to an array of edges
    tree_edges = tree.as_array()
    # Print the edges
    print(tree_edges)

if __name__ == '__main__':
    main()