import { writeFileSync, readFileSync } from 'fs'
import { join } from 'path'

export default () => {
  const timings = {}
  const sizes = [100, 1000, 10000, 100000, 500000, 1000000]

  sizes.forEach((_, index) => {
    const path = join(__dirname, `sets/${index + 1}.txt`)
    const data = readFileSync(path, 'utf8')
    const dataset = data.split(' ').map(Number)

    console.log(`Set ${index + 1} (Before sorting):`)
    console.log(dataset.join(' '))

    const startTime = new Date().getTime()
    const sortedDataset = sortArr(dataset)
    const endTime = new Date().getTime()

    const sortTime = endTime - startTime // Time in milliseconds
    timings[`Set ${index + 1}`] = sortTime

    console.log(`\nTime taken to sort Set ${index + 1}: ${sortTime} milliseconds`)
    console.log(`Set ${index + 1} (After sorting):`)
    console.log(sortedDataset.join(' '))

    const path2 = `sortedSets/${index + 1}.txt`
    writeFileSync(path2, sortedDataset.join(' '))
    console.log(`Sorted dataset ${index + 1} stored in '${path2}'\n`)
  })

  writeTimings(timings)
}

function sortArr(arr: number[]) {
  // Sorts an array in ascending order using the selection sort algorithm
  const n = arr.length
  for (let i = 0; i < n; i++) {
    let minId = i
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minId]) {
        minId = j
      }
    }
    ;[arr[i], arr[minId]] = [arr[minId], arr[i]] // Swap
  }
  return arr
}

function writeTimings(timings: { [key: string]: number }) {
  const csvData = Object.entries(timings).map(([key, value]) => ({ Dataset: key, 'Time (ms)': value }))
  const csvFilePath = 'sortedSets/timings.csv'

  const createCsvWriter = require('csv-writer').createObjectCsvWriter
  const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: [
      { id: 'Dataset', title: 'Dataset' },
      { id: 'Time (ms)', title: 'Time (ms)' }
    ]
  })

  csvWriter
    .writeRecords(csvData)
    .then(() => console.log(`Timings saved to ${csvFilePath}`))
    .catch((err) => console.error(`Error writing CSV: ${err}`))
}
