import { readFileSync, writeFileSync } from 'fs'
import { performance } from 'perf_hooks'
import { createObjectCsvWriter } from 'csv-writer'
import { join } from 'path'

export default () => {
  const timings = {}
  const sizes: number[] = [100, 1000, 10000, 100000, 500000, 1000000]
  const insertTimes: number[] = []
  const dequeueTimes: number[] = []

  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i]
    const path = join(__dirname, `sets/${i + 1}.txt`)
    const dataset = readFileSync(path, 'utf8').split(' ').map(Number)
    console.log(`Set ${i + 1} (Before sorting):`)
    console.log(dataset.join(' '))

    const { sortedArr, insertTime, dequeueTime } = heapSort(dataset)
    timings[size] = insertTime + dequeueTime

    console.log(`\nTime taken to insert data into the heap for Set ${i + 1}: ${insertTime.toFixed(0)} milliseconds`)
    console.log(
      `Time taken to dequeue (remove) data from the heap for Set ${i + 1}: ${dequeueTime.toFixed(0)} milliseconds\n`
    )

    console.log(`Set ${i + 1} (After sorting):`)
    console.log(sortedArr.join(' '))

    // Write the sorted array to a file
    const path2 = join(__dirname, `sortedSets/${i + 1}.txt`)
    writeFileSync(path2, sortedArr.join(' '))
    console.log(`Sorted dataset ${i + 1} stored in '${path2}'\n`)

    insertTimes.push(insertTime)
    dequeueTimes.push(dequeueTime)
  }

  writeTimings(timings)
}

function heapify(arr: number[], n: number, i: number) {
  // Maintains the heap property between parent and children nodes
  let largest = i
  let left = 2 * i + 1
  let right = 2 * i + 2

  if (left < n && arr[left] > arr[largest]) largest = left
  if (right < n && arr[right] > arr[largest]) largest = right

  if (largest !== i) {
    ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
    heapify(arr, n, largest)
  }
}

function heapPush(heap: number[], item: number) {
  // Adds an item to the heap while maintaining the heap property
  heap.push(item)
  let current = heap.length - 1
  while (current > 0) {
    let parent = (current - 1) >> 1
    if (heap[current] > heap[parent]) {
      ;[heap[current], heap[parent]] = [heap[parent], heap[current]]
      current = parent
    } else break
  }
}

function heapPop(heap: number[]) {
  // Removes and returns the top element of the heap, re-balancing it afterwards
  const n = heap.length
  if (n === 0) return null
  if (n === 1) return heap.pop()

  const top = heap[0]
  // @ts-ignore
  heap[0] = heap.pop()
  heapify(heap, heap.length, 0)
  return top
}

function heapSort(arr: number[]) {
  // Sorts an array using the heap sort algorithm and measures the time taken for insertion and removal
  const heap = []
  // Measure time to insert all data into the heap
  const startInsert = performance.now()
  for (const element of arr) heapPush(heap, element)
  const endInsert = performance.now()
  const insertTime = endInsert - startInsert

  // Measure time to dequeue all data from the heap
  const startDequeue = performance.now()
  const sortedArr = []
  // @ts-ignore
  while (heap.length > 0) sortedArr.push(heapPop(heap))
  const endDequeue = performance.now()
  const dequeueTime = endDequeue - startDequeue

  return { sortedArr, insertTime, dequeueTime }
}

function writeTimings(timings: { [key: string]: number }) {
  const csvWriter = createObjectCsvWriter({
    path: join(__dirname, 'sortedSets/timings.csv'),
    header: Object.keys(timings).map((key) => ({ id: key, title: key }))
  })

  csvWriter
    .writeRecords([timings])
    .then(() => console.log('Timing data saved to sortedSets/timings.csv'))
    .catch((err) => console.error(`Error writing CSV: ${err}`))
}
