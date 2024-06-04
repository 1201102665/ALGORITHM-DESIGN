import random

from helper import write_file

def generate_data(size, digits):
    """Generate data set of a given size using the specified digits"""
    # Determine the maximum number of digits needed based on the size of the dataset
    max_digit_length = len(str(size)) - 1
    return [int("".join(random.choice(digits) for _ in range(max_digit_length)))
        for _ in range(size)]

def main():
    # Allowed digits based on leader's ID
    allowed_digits = ['1', '2', '3', '4', '7']

    # Sizes for each dataset
    sizes = [100, 1000, 10000, 100000, 500000, 1000000]

    # Save Generated datasets to txt files
    for i, size in enumerate(sizes):
        data = generate_data(size, allowed_digits)
        print(data)

        filename = f"sets/{i+1}.txt"
        write_file(data, filename)
        print(f"Data for Set {i+1} saved to {filename}")

if __name__ == '__main__':
    main()