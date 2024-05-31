import random

def generate_data(size, digits):
    """Generate data set of a given size using the specified digits."""
    # Determine the maximum number of digits needed based on the size of the dataset
    max_digit_length = len(str(size)) - 1
    return [int("".join(random.choice(digits) for _ in range(max_digit_length)))
        for _ in range(size)]

def write_to_file(data, filename):
    """Save the dataset to a text file."""
    with open(filename, 'w') as file:
        for number in data:
            file.write(f"{number}\n")

# Allowed digits based on leader's ID
allowed_digits = ['1', '2', '3', '4', '7']

# Sizes for each dataset
sizes = [100, 1000, 10000, 100000, 500000, 1000000]

# Save Generated datasets to txt files
for i, size in enumerate(sizes):
    data = generate_data(size, allowed_digits)
    print(data)

    filename = f"dataset1_set_{i+1}.txt"
    write_to_file(data, filename)
    print(f"Data for Set {i+1} saved to {filename}")
