import math
from typing import List

from helper import Star, calc_dis
from helper import read_file

def get_neighbors(star: Star, stars: List[Star]):
    neighbors: List[Star] = []
    
    for i in star.routes:
        neighbors.append(stars[i])

    return neighbors

def calculate_paths(start: Star, stars: List[Star]):
    table = {}
    for s in stars:
        table[s.name] = {
            'shortest_dis': math.inf if s.name != start.name else 0,
            'prev_star': None
        }

    unvisited = [s for s in stars]
    visited = []

    for s in unvisited:
        neighbors = get_neighbors(s, stars)
        for n in neighbors:
            dist = calc_dis(s, n)

            if dist < table[n.name]['shortest_dis']:
                table[n.name]['shortest_dis'] = dist
                table[n.name]['prev_star'] = s.name

        visited.append(s)
        unvisited.remove(s)

    return table

def get_shortest_path(start: Star, end: Star, table: dict):
    path = []
    current_star = table[end.name]
    current_star_n = end.name

    while start.name != end.name and current_star['prev_star'] != None:
        path.append(current_star_n)
        prev_star_n = table[current_star_n]['prev_star']
        current_star = table[prev_star_n]
        current_star_n = prev_star_n
    
    path.append(start.name)
    return list(reversed(path))

def main():
    stars = read_file()
    starting_star = stars[0]
    ending_star = stars[-1]

    table = calculate_paths(starting_star, stars)
    path = get_shortest_path(starting_star, ending_star, table)

if __name__ == '__main__':
    main()