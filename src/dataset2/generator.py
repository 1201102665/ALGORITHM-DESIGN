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
	# draw_graph(stars, unique_routes)

if __name__ == '__main__':
	main()