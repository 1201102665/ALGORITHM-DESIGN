import { readStars } from './helper'

export default () => {
  const stars = readStars()

  const cap = stars.length
  const P = stars.map((s) => s.profit)
  const W = stars.map((s) => s.weight)

  console.log(Knapsack_01.knapsack(cap, W, P))
}

class Knapsack_01 {
  /**
   * @param cap - The maximum capacity of the knapsack
   * @param W - The weights of the items
   * @param P - The profit of the items
   * @return The maximum achievable profit of selecting a subset of the elements such that the
   *     capacity of the knapsack is not exceeded
   */
  static knapsack(cap: number, W: number[], P: number[]): number[] {
    const N = W.length

    // Initialize a table where individual rows represent items
    // and columns represent the weight of the knapsack
    let DP: number[][] = Array.from({ length: N + 1 }, () => Array(cap + 1).fill(0))

    for (let i = 1; i <= N; i++) {
      // Get the value and weight of the item
      const w = W[i - 1],
        p = P[i - 1]

      for (let size = 1; size <= cap; size++) {
        // Consider not picking this element
        DP[i][size] = DP[i - 1][size]
        console.log('📢 --------------------------------------------------------------------------------📢')
        console.log('📢 | file: 00.ts:36 | Knapsack_01 | knapsack | DP[i - 1][size]:', DP[i - 1][size])
        console.log('📢 --------------------------------------------------------------------------------📢')

        // Consider including the current element and
        // see if this would be more profitable
        if (size >= w && DP[i - 1][size - w] + p > DP[i][size]) DP[i][size] = DP[i - 1][size - w] + p
      }
    }

    let sz = cap
    const itemsSelected: number[] = []

    // Using the information inside the table we can backtrack and determine
    // which items were selected during the dynamic programming phase. The idea
    // is that if DP[i][sz] != DP[i-1][sz] then the item was selected
    for (let i = N; i > 0; i--) {
      if (DP[i][sz] != DP[i - 1][sz]) {
        const itemIndex = i - 1
        itemsSelected.push(itemIndex)
        sz -= W[itemIndex]
      }
    }

    // Return the items that were selected
    itemsSelected.reverse()
    return itemsSelected
  }
}
