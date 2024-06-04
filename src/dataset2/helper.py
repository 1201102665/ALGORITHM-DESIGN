import math
import os
from typing import List

class Star:
    """The main class in dataset2 used to represent a single star"""
    i: int
    name: str
    x: int
    y: int
    z: int
    weight: int
    profit: int
    routes: List[int]

    def __init__(self, i: int, x: int, y: int, z: int, weight: int, profit: int, routes: List[int]=None):
        self.name = chr(ord('A') + i)
        self.i = i
        self.x = x
        self.y = y
        self.z = z
        self.weight = weight
        self.profit = profit
        self.routes = routes if routes is not None else []  # List of connected star IDs

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
	
	with open("./sets/1.txt", 'w') as file:
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
            star = Star(int(data[0]), int(data[2]), int(data[3]), int(data[4]), int(data[5]), int(data[6]), routes)
            stars.append(star)

    return stars