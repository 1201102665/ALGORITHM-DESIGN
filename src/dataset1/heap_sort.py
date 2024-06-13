import os
import time
from helper import read_file
from csv import DictWriter
from visualize import plot_timing_data

def print_array(arr):
    print(" ".join(map(str, arr)))

def write_array_to_file(arr, filename):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, 'w') as file:
        file.write(" ".join(map(str, arr)) + "\n")

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heappush(heap, item):
    heap.append(item)
    current = len(heap) - 1
    while current > 0:
        parent = (current - 1) >> 1
        if heap[current] > heap[parent]:
            heap[current], heap[parent] = heap[parent], heap[current]
            current = parent
        else:
            break

def heappop(heap):
    n = len(heap)
    if n == 0:
        return None
    if n == 1:
        return heap.pop()
    
    top = heap[0]
    heap[0] = heap.pop()
    heapify(heap, len(heap), 0)
    return top

def heap_sort(arr):
    heap = []
    # Measure time to insert all data into the heap
    start_insert = time.time()
    for element in arr:
        heappush(heap, element)
    end_insert = time.time()
    insert_time = (end_insert - start_insert) * 1_000  # Convert to millisecond

    # Measure time to dequeue all data from the heap
    start_dequeue = time.time()
    sorted_arr = []
    while heap:
        sorted_arr.append(heappop(heap))
    end_dequeue = time.time()
    dequeue_time = (end_dequeue - start_dequeue) * 1_000  # Convert to millisecond

    return sorted_arr, insert_time, dequeue_time

def main():
    timings = {}
    sizes = [100, 1000, 10000, 100000, 500000, 1000000]
    insert_times = []
    dequeue_times = []
    for i, size in enumerate(sizes, start=1):
        dataset = read_file(f"sets/{i}.txt")
        print(f"Set {i} (Before sorting):")
        print_array(dataset)
        
        dataset, insert_time, dequeue_time = heap_sort(dataset)
        timings.update({f"{size}": insert_time + dequeue_time})



        print(f"\nTime taken to insert data into the heap for Set {i}: {insert_time:.0f} millisecond")
        print(f"Time taken to dequeue (remove) data from the heap for Set {i}: {dequeue_time:.0f} millisecond\n")
        
        print(f"Set {i} (After sorting):")
        print_array(dataset)

        # Write the sorted array to a file
        output_filename = f"sorted_sets/sorted_set_{i}.txt"
        write_array_to_file(dataset, output_filename)
        print(f"Sorted dataset {i} stored in '{output_filename}'\n")

        insert_times.append(insert_time)
        dequeue_times.append(dequeue_time)

    with open("sorted_sets/timings.csv", 'w') as timing:
        writer = DictWriter(timing, fieldnames=list(timings.keys()))
        writer.writeheader()
        writer.writerow(timings)


if __name__ == '__main__':
    main()
    # Call the function with your CSV file
    plot_timing_data('sorted_sets/timings.csv')
