
import os
from typing import List
from helper import Star, read_file

def calc_dp(stars: List[Star], max_w: int):
    n = len(stars)  # number of stars
    dp = [[0 for w in range(max_w + 1)] for i in range(n + 1)]

    for i in range(n + 1):
        for w in range(max_w + 1):
            if i == 0 or w == 0:
                dp[i][w] = 0
            elif stars[i-1].weight <= w:
                dp[i][w] = max(stars[i-1].profit + dp[i-1][w-stars[i-1].weight], dp[i-1][w])
            else:
                dp[i][w] = dp[i-1][w]

    return dp

def choose_path(stars: List[Star], dp: List[List[int]], max_w: int):
    to_visit = []

    for i in range(len(stars), 0, -1):
        if dp[i][max_w] != dp[i - 1][max_w]:  # the star is included in the optimal solution
            to_visit.append(stars[i - 1])
            max_w -= stars[i - 1].weight

    return to_visit

def all_paths(stars: List[Star]):
    def dfs(star: Star, visited: set, path: List[Star], paths: List[List[Star]]):
        visited.add(star)
        path.append(star)

        # If there are no more routes to follow, add the current path to the list of all paths
        if not any(stars[route] not in visited for route in star.routes):
            paths.append(path.copy())
        else:
            # Recursively call dfs for each route that has not been visited yet
            for route in star.routes:
                if stars[route] not in visited:
                    dfs(stars[route], visited, path, paths)

        visited.remove(star)
        path.pop()

    paths = []

    for star in stars:
        visited = set()
        path = []
        dfs(star, visited, path, paths)

    return paths

def main():
    # create a list of Star objects
    stars = read_file()

    # call the knapsack function
    max_w = 800  # maximum weight
    paths = all_paths(stars)
    # i=0
    # with open('results.txt', 'w') as f:
    #     for path in paths:
    #         f.write(f"{i+1}: ")
    #         j=0
    #         for p in path:
    #             if j > 0:
    #                 f.write(f" -> ")
    #             f.write(f"{p.i}")
    #             j+=1
    #         f.write("\n")
    #         i+=1
    # return

    dp = calc_dp(stars, max_w)
    to_visit = choose_path(stars, dp, max_w)

    dir_path = os.path.dirname(os.path.realpath(__file__))
    file_path = os.path.join(dir_path, 'sets', 'knapsack_result.txt')
    
    # open the output file in write mode
    with open(file_path, 'w') as f:
        # write the dp table to the file
        for row in dp:
            f.write(' '.join(str(r) for r in row) + '\n')

        # write the stars to visit to the file
        f.write('\nStars to visit:\n')
        for s in to_visit:
            f.write(f'{s.name} (weight: {s.weight}, profit: {s.profit})\n')
