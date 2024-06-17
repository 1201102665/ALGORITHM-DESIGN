import { join } from 'path'
import { readStars } from './helper'
import { writeFileSync } from 'fs'

export default () => {
  const stars = readStars()

  const cap = 800 // in kg
  const wArr = stars.map((s) => s.weight)
  const pArr = stars.map((s) => s.profit)

  const table: number[][] = makeTable(cap, wArr, pArr)
  const toVisit = selectStars(table, cap, wArr)

  const tableData = table.map((row) => row.map((num) => String(num).padStart(4, '0')).join(',')).join('\n')
  const toVisitData =
    '| Index | Name | Weight | Profit |\n| --- | --- | --- | --- |\n' +
    toVisit.map((i) => `| ${String(stars[i].i).padStart(2, '0')} | ${stars[i].name} | ${String(wArr[i]).padStart(3, '0')} | ${String(pArr[i]).padStart(3, '0')} |`).join('\n')

  const data = `${tableData}\n\n${toVisitData}`
  writeFileSync(join(__dirname, 'saved/conquer_quest.txt'), data)
}

function makeTable(cap: number, wArr: number[], pArr: number[]): number[][] {
  const len = wArr.length

  const table: number[][] = Array.from({ length: len + 1 }, () => Array(cap + 1).fill(0))

  for (let i = 1; i <= len; i++) {
    const j = i - 1
    const w = wArr[j]
    const p = pArr[j]

    for (let currCap = 1; currCap <= cap; currCap++) {
      table[i][currCap] = table[j][currCap]
      const current = table[j][currCap - w] + p

      if (currCap >= w && current > table[i][currCap]) table[i][currCap] = current
    }
  }

  return table
}

function selectStars(table: number[][], cap: number, wArr: number[]): number[] {
  const len = wArr.length
  const selected: number[] = []

  for (let i = len; i > 0; i--) {
    const j = i - 1
    if (table[i][cap] != table[j][cap]) {
      selected.push(j)
      cap -= wArr[j]
    }
  }

  selected.reverse()
  return selected
}
