const fs = require('fs');
const { performance } = require('perf_hooks');
const { createObjectCsvWriter } = require('csv-writer');
const { writeFileSync, mkdirSync } = require('fs');
const { join } = require('path');

function printArray(arr) {
    // Prints the elements of the array in a single line
    console.log(arr.join(" "));
}

function writeArrayToFile(arr, filename) {
    // Creates the directory if it does not exist and writes the array to a file
    // mkdirSync(path.dirname(filename), { recursive: true });
    writeFileSync(filename, arr.join(" ") + "\n");
}

function heapify(arr, n, i) {
    // Maintains the heap property between parent and children nodes
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

function heappush(heap, item) {
    // Adds an item to the heap while maintaining the heap property
    heap.push(item);
    let current = heap.length - 1;
    while (current > 0) {
        let parent = (current - 1) >> 1;
        if (heap[current] > heap[parent]) {
            [heap[current], heap[parent]] = [heap[parent], heap[current]];
            current = parent;
        } else {
            break;
        }
    }
}

function heappop(heap) {
    // Removes and returns the top element of the heap, re-balancing it afterwards
    let n = heap.length;
    if (n === 0) {
        return null;
    }
    if (n === 1) {
        return heap.pop();
    }

    let top = heap[0];
    heap[0] = heap.pop();
    heapify(heap, heap.length, 0);
    return top;
}

function heapSort(arr) {
    // Sorts an array using the heap sort algorithm and measures the time taken for insertion and removal
    let heap = [];
    // Measure time to insert all data into the heap
    let startInsert = performance.now();
    for (let element of arr) {
        heappush(heap, element);
    }
    let endInsert = performance.now();
    let insertTime = (endInsert - startInsert);

    // Measure time to dequeue all data from the heap
    let startDequeue = performance.now();
    let sortedArr = [];
    while (heap.length > 0) {
        sortedArr.push(heappop(heap));
    }
    let endDequeue = performance.now();
    let dequeueTime = (endDequeue - startDequeue);

    return { sortedArr, insertTime, dequeueTime };
}

function readFileSync(fileName) {
    return fs.readFileSync(fileName, 'utf8').trim().split(/\s+/).map(Number);
}

async function main() {
    let timings = {};
    let sizes = [100, 1000, 10000, 100000, 500000, 1000000];
    let insertTimes = [];
    let dequeueTimes = [];

    for (let i = 0; i < sizes.length; i++) {
        let size = sizes[i];
        let dataset = readFileSync(join(__dirname, `sets/${i + 1}.txt`));
        console.log(`Set ${i + 1} (Before sorting):`);
        printArray(dataset);

        let { sortedArr, insertTime, dequeueTime } = heapSort(dataset);
        timings[size] = insertTime + dequeueTime;

        console.log(`\nTime taken to insert data into the heap for Set ${i + 1}: ${insertTime.toFixed(0)} milliseconds`);
        console.log(`Time taken to dequeue (remove) data from the heap for Set ${i + 1}: ${dequeueTime.toFixed(0)} milliseconds\n`);

        console.log(`Set ${i + 1} (After sorting):`);
        printArray(sortedArr);

    

        // Write the sorted array to a file
        let outputFilename = join(__dirname, `sorted_sets/sorted_set_${i + 1}.txt`);
        writeArrayToFile(sortedArr, outputFilename);
        console.log(`Sorted dataset ${i + 1} stored in '${outputFilename}'\n`);

        insertTimes.push(insertTime);
        dequeueTimes.push(dequeueTime);
    }

    const csvWriter = createObjectCsvWriter({
        path: join(__dirname, 'sorted_sets/timings.csv'),
        header: Object.keys(timings).map(key => ({ id: key, title: key }))
    });

    await csvWriter.writeRecords([timings]);
    console.log('Timing data saved to sorted_sets/timings.csv');
}

main();
