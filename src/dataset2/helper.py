import math
import os

from typing import List, Tuple

import matplotlib.pyplot as plt
import networkx as nx
import graphlib

from networkx import convert_node_labels_to_integers

class Star:
    """The main class in dataset2 used to represent a single star"""
    i: int
    name: str
    x: int
    y: int
    z: int
    weight: int
    profit: int
    routes: List[int] # List of connected star by index

    def __init__(self, i: int, name: str, x: int, y: int, z: int, weight: int, profit: int, routes: List[int]=None):
        self.name = name
        self.i = i
        self.x = x
        self.y = y
        self.z = z
        self.weight = weight
        self.profit = profit
        self.routes = routes if routes is not None else [] # List of connected star by index

def calc_dis(star1: Star, star2: Star):
    """Calculate the distance between two stars using the Euclidean distance formula"""
    x_diff = star2.x - star1.x
    y_diff = star2.y - star1.y
    z_diff = star2.z - star1.z

    dist_squared = x_diff**2 + y_diff**2 + z_diff**2
    dist = math.sqrt(dist_squared)

    return dist

def write_file(stars: List[Star]):
    """Save the dataset to a text file"""
    data = ''
    for i, size in enumerate(stars):
        data += f"{size.i},,{size.name},,{size.x},,{size.y},,{size.z},,{size.weight},,{size.profit},,{size.routes}\n"
	
    dir_path = os.path.dirname(os.path.realpath(__file__))
    file_path = os.path.join(dir_path, 'sets', '1.txt')

    with open(file_path, 'w') as file:
        file.write(data)

def read_file():
    """Load the dataset from a text file"""
    stars: List[Star] = []

    dir_path = os.path.dirname(os.path.realpath(__file__))
    file_path = os.path.join(dir_path, 'sets', '1.txt')

    with open(file_path, 'r') as file:
        lines = file.readlines()
        for l in lines:
            data = l.strip().split(',,')
            routes = list(map(int, data[7].replace('[', '').replace(']', '').split(', ')))
            star = Star(int(data[0]), data[1], int(data[2]), int(data[3]), int(data[4]), int(data[5]), int(data[6]), routes)
            stars.append(star)

    return stars

def draw_graph(stars: List[Star], unique_routes: List[Tuple[int, int]]):
	G = nx.Graph()

	for star in stars:
		G.add_node(star.name, x=star.x, y=star.y, z=star.z, weight=star.weight, profit=star.profit)

	for route in unique_routes:
		i = route[0]
		j = route[1]
		s1 = stars[i]
		s2 = stars[j]
		G.add_edge(s1.name, s2.name, weight=(s1.weight + s2.weight))

	# convert_node_labels_to_integers(G, first_label=0, ordering='default', label_attribute=star)

	# print(f"number_of_nodes: {G.number_of_nodes()}")
	# print(f"nodes: {list(G.nodes)}")
	# print(f"number_of_edges: {G.number_of_edges()}")
	# print(f"edges: {list(G.edges)}")

	pos = {star.name: (star.x, star.y) for star in stars}

	# # Customize node size, node color, and node shape
	# node_sizes = [star.weight * 10 for star in stars]  # Adjust size multiplier as needed
	# node_colors = range(len(stars))
	# nx.draw_networkx_nodes(G, pos, node_size=node_sizes, node_color=node_colors, node_shape='s')

	# # Customize edge width and edge color
	# edge_widths = [G[u][v]['weight'] / 10 for u, v in G.edges()]  # Adjust width divisor as needed
	# edge_colors = range(len(G.edges()))
	# nx.draw_networkx_edges(G, pos, width=edge_widths, edge_color=edge_colors)

	# # Draw nodes
	# node_sizes = [star.weight * 10 for star in stars]  # Adjust size multiplier as needed
	# nx.draw_networkx_nodes(G, pos, node_size=node_sizes, node_color='blue', node_shape='s')

	# # Draw edges
	# edge_widths = [G[u][v]['weight'] / 10 for u, v in G.edges()]  # Adjust width divisor as needed
	# nx.draw_networkx_edges(G, pos, width=edge_widths, edge_color='black')

	# # Draw node labels with weights
	# node_labels = {node: data['weight'] for node, data in G.nodes(data=True)}
	# nx.draw_networkx_labels(G, pos, labels=node_labels)

	# # Draw edge labels with weights
	# edge_labels = nx.get_edge_attributes(G, 'weight')
	# nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels)

	nx.draw(G, pos=pos, with_labels=True)
	plt.show()