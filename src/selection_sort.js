const fs = require('fs');
const path = require('path');

function printArray(arr) {
    // Prints the elements of the array in a single line
    console.log(arr.join(" "));
}

function writeArrayToFile(arr, filename) {
    // Creates the directory if it does not exist and writes the array to a file
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, arr.join(" ") + "\n");
}

function selectionSort(arr) {
    // Sorts an array in ascending order using the selection sort algorithm
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]; // Swap
    }
    return arr;
}

function readFileSync(filename) {
    // Helper function to read file synchronously and return array of numbers
    const data = fs.readFileSync(filename, 'utf8');
    return data.trim().split(/\s+/).map(Number);
}

function main() {
    const timings = {};
    const sizes = [100, 1000, 10000, 100000, 500000, 1000000];

    sizes.forEach((size, index) => {
        const dataset = readFileSync(path.join(__dirname, `sets/${index + 1}.txt`));
        console.log(`Set ${index + 1} (Before sorting):`);
        printArray(dataset);

        const startSorting = new Date().getTime();
        const sortedDataset = selectionSort(dataset);
        const endSorting = new Date().getTime();
        const sortingTime = endSorting - startSorting; // Time in milliseconds

        timings[`Set ${index + 1}`] = sortingTime;

        console.log(`\nTime taken to sort Set ${index + 1}: ${sortingTime} milliseconds`);
        console.log(`Set ${index + 1} (After sorting):`);
        printArray(sortedDataset);

        const outputFilename = `sorted_sets/sorted_set_${index + 1}.txt`;
        writeArrayToFile(sortedDataset, outputFilename);
        console.log(`Sorted dataset ${index + 1} stored in '${outputFilename}'\n`);

        
    });

    // Write timings to CSV file
    const csvData = Object.entries(timings).map(([key, value]) => ({ Dataset: key, "Time (ms)": value }));
    const csvFilePath = 'sorted_sets/timings.csv';

    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: csvFilePath,
        header: [
            { id: 'Dataset', title: 'Dataset' },
            { id: 'Time (ms)', title: 'Time (ms)' }
        ]
    });

    csvWriter.writeRecords(csvData)
        .then(() => console.log(`Timings saved to ${csvFilePath}`))
        .catch(err => console.error(`Error writing CSV: ${err}`));
}

main();
