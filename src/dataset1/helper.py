from typing import List

def write_file(nums: List[int], file_name: str):
    """Save the dataset to a text file"""
    with open(file_name, 'w') as file:
        for num in nums:
            file.write(f"{num}\n")

def read_file(file_name: str):
    """Load the dataset from a text file"""
    nums = []
    with open(file_name, 'r') as file:
        for line in file:
            nums.append(int(line.strip()))
    return nums