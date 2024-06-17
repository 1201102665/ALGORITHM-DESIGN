import { writeFileSync } from 'fs'
import { join } from 'path'

export default () => {
  // Allowed digits based on leader's ID
  const digits = '1211310047'.split('').map(Number)

  // Sizes for each dataset
  const sizes = [100, 1000, 10000, 100000, 500000, 1000000]

  // Save generated datasets to txt files
  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i]
    const data = generateData(size, digits)
    console.log(data)

    const path = join(__dirname, `sets/${i + 1}.txt`)
    writeFileSync(path, data.join('\n'))
    console.log(`Data for Set ${i + 1} saved to ${path}`)
  }
}

function generateData(size: number, digits: number[]) {
  // Generate data set of a given size using the specified digits
  const data: number[] = []

  for (let i = 0; i < size; i++) {
    let numStr = ''
    for (let j = 0; j < 3; j++) {
      const num = Math.floor(Math.random() * digits.length)
      numStr += digits[num]
    }
    data.push(parseInt(numStr))
  }

  return data
}
