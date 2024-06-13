import random
from helper import write_file

def generate_data(size, digits):
    """Generate data set of a given size using the specified digits"""
    return [int("".join(random.choice(digits) for _ in range(3)))
        for _ in range(size)]

def main():
    # Allowed digits based on leader's ID
    allowed_digits = [int(d) for d in '1211310047']

    # Sizes for each dataset
    sizes = [100, 1_000, 10_000, 100_000, 500_000, 1_000_000]

    # Save Generated datasets to txt files
    for i, size in enumerate(sizes):
        data = generate_data(size, allowed_digits)
        print(data)

        file_name = f"sets/{i+1}.txt"
        write_file(data, file_name)
        print(f"Data for Set {i+1} saved to {file_name}")

if __name__ == '__main__':
    main()