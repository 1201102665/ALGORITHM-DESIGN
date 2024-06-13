import os
from typing import List

def write_file(nums: List[int], file_name: str):
    """Save the dataset to a text file"""
    this_path = os.path.dirname(os.path.realpath(__file__))
    dir_path = os.path.join(this_path, 'sets')

    if not os.path.exists(dir_path):
        os.makedirs(dir_path)

    file_path = os.path.join(dir_path, file_name)
    
    with open(file_path, 'w') as file:
        for num in nums:
            file.write(f"{num}\n")

def read_file(file_name: str):
    """Load the dataset from a text file"""
    this_path = os.path.dirname(os.path.realpath(__file__))
    dir_path = os.path.join(this_path, 'sets')

    if not os.path.exists(dir_path):
        os.makedirs(dir_path)

    nums = []
    file_path = os.path.join(dir_path, file_name)

    with open(file_path, 'r') as file:
        for line in file:
            nums.append(int(line.strip()))
    return nums