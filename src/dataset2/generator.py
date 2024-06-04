import math
import random
import matplotlib.pyplot as plt
import networkx as nx
import graphlib

from networkx import convert_node_labels_to_integers
from helper import Star, write_file

def generate_stars(count):
	stars = []
	for i in range(count):
		x, y, z, weight, profit = random.randint(0, 9), random.randint(0, 9), random.randint(0, 9), random.randint(0, 9), random.randint(0, 9)
		stars.append(Star(i, x, y, z, weight, profit))
	return stars

def connect_stars(stars, num_routes):
	route_count = 0
	star_len = len(stars)

	for star in stars:
		j = star.i
		while len(star.routes) < 5:
			j += 1
			if j >= star_len:
				j -= star_len
			if j == star.i:
				j += 1
			
			star2 = stars[j]
			if star2.i in star.routes:
				continue
			
			star.routes.append(j)
			star2.routes.append(star.i)
			route_count += 1

	if route_count != num_routes:
		exit(f"ERROR: Route count isn't {num_routes}, it's {route_count}")

def get_unique_routes(stars, num_routes):
	routes_set = set()
	for star in stars:
		i = star.i

		top_row = i < 5
		bottom_row = i >= 15
		left_column = i % 5 == 0
		right_column = i % 5 == 4

		if not right_column:
			routes_set.add((i, i + 1))
		if not left_column:
			routes_set.add((i - 1, i))

		if not bottom_row:
			routes_set.add((i, i + 5))
		if not top_row:
			routes_set.add((i - 5, i))

		if not bottom_row and not right_column:
			routes_set.add((i, i + 6))
		if not bottom_row and not left_column:
			routes_set.add((i, i + 4))

	star_len = len(stars)
	routes_set.remove((star_len - 2, star_len - 1))

	route_len = len(routes_set)
	if route_len != num_routes:
		exit(f"ERROR: Route count isn't {num_routes}, {route_len}")

	return list(routes_set)

def main():
	num_stars = 20
	num_routes = 54
	# FIX: fill in later
	# allowed_digits = []

	stars = generate_stars(num_stars)
	connect_stars(stars, num_routes)

	# for star in stars:
	# 	print(f"Star {star.name}: {star.i}")
	# 	print(f"Location: ({star.x}, {star.y}, {star.z})")
	# 	print(f"Weight: {star.weight}, Profit: {star.profit}")
	# 	print(f"Routes: {star.routes}\n")

	unique_routes = get_unique_routes(stars, num_routes)
	unique_routes = sorted(unique_routes)

	write_file(stars)

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

if __name__ == '__main__':
	main()