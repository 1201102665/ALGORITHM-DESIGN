import os
import time
from csv import DictWriter
from helper import read_file
from visualize import plot_timing_data


def print_array(arr):
    print(" ".join(map(str, arr)))


def write_array_to_file(arr, filename):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, 'w') as file:
        file.write(" ".join(map(str, arr)) + "\n")


def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr


def main():
    timings = {}
    sizes = [100, 1000, 10000, 100000, 500000, 1000000]
    sorting_times = []
    for i, size in enumerate(sizes, start=1):
        dataset = read_file(f"sets/{i}.txt")
        print(f"Set {i} (Before sorting):")
        print_array(dataset)

        start_sorting = time.time()
        sorted_dataset = selection_sort(dataset)
        end_sorting = time.time()
        sorting_time = (end_sorting - start_sorting) * 1000 # Convert to millisecond

        timings.update({f"{size}": sorting_time})


        print(f"\nTime taken to sort Set {i}: {sorting_time:.0f} millisecond")

        print(f"Set {i} (After sorting):")
        print_array(sorted_dataset)

        # Write the sorted array to a file
        output_filename = f"sorted_sets/sorted_set_{i}.txt"
        write_array_to_file(sorted_dataset, output_filename)
        print(f"Sorted dataset {i} stored in '{output_filename}'\n")

        sorting_times.append(sorting_time)

    with open("sorted_sets/timings.csv", 'w') as timing:
        writer = DictWriter(timing, fieldnames=list(timings.keys()))
        writer.writeheader()
        writer.writerow(timings)


if __name__ == '__main__':
    main()
    plot_timing_data('sorted_sets/timings.csv')

