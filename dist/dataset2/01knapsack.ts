import { Star, readStars } from './helper'

export default () => {
  const stars = readStars()
  const len = stars.length
  const capacity = 8
  const cache = Array.from({ length: len + 1 }, () => Array(capacity + 1).fill(-1))

  const profit = zeroOneKnapsack(stars, len, capacity, cache)
  console.log('📢 ------------------------------------📢')
  console.log('📢 Maximum Profit:', profit)
  console.log('📢 ------------------------------------📢')
}

function zeroOneKnapsack(arr: Star[] | number[][], n: number, cap: number, cache: any[][]) {
  // Base Case: No capacity or no items
  if (cap === 0 || n === 0) {
    cache[n][cap] = 0
    return cache[n][cap]
  }

  // Lookup (value already calculated)
  if (cache[n][cap] !== -1) {
    return cache[n][cap]
  }

  // Profit when excluding the nth item
  let notPick = zeroOneKnapsack(arr, n - 1, cap, cache)

  // Profit when including the nth item
  let pick = 0
  if (arr[n - 1][0] <= cap) {
    // If weight of the nth item is within the capacity
    pick = arr[n - 1][1] + zeroOneKnapsack(arr, n - 1, cap - arr[n - 1][0], cache)
  }

  cache[n][cap] = Math.max(pick, notPick) // maximize profit
  return cache[n][cap]
}
