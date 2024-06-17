const fs = require('fs');
const { join } = require('path');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateData(size, digits) {
    // Generate data set of a given size using the specified digits
    let data = [];
    for (let i = 0; i < size; i++) {
        let numStr = '';
        for (let j = 0; j < 3; j++) {
            numStr += digits[getRandomInt(digits.length)];
        }
        data.push(parseInt(numStr, 10));
    }
    return data;
}

function writeFile(data, fileName) {
    fs.writeFile(fileName, data.join('\n'), (err) => {
        if (err) throw err;
        console.log(`Data for ${fileName} saved`);
    });
}

function main() {
    // Allowed digits based on leader's ID
    let allowedDigits = '1211310047'.split('').map(Number);

    // Sizes for each dataset
    let sizes = [100, 1000, 10000, 100000, 500000, 1000000];

    // Save generated datasets to txt files
    for (let i = 0; i < sizes.length; i++) {
        let size = sizes[i];
        let data = generateData(size, allowedDigits);
        console.log(data);

        let fileName = join(__dirname, `sets/${i + 1}.txt`);
        writeFile(data, fileName);
        console.log(`Data for Set ${i + 1} saved to ${fileName}`);
    }
}

main();