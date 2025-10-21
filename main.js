const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

program
    .requiredOption('-i, --input <path>', 'шлях до файлу для читання')
    .option('-o, --output <path>', 'шлях до файлу для запису результату')
    .option('-d, --display', 'вивести результат у консоль')
    .option('-f, --furnished', 'відображати лише будинки з меблями')
    .option('-p, --price <number>', 'відображати лише будинки з ціною меншою за зазначену', parseFloat);

program.parse(process.argv);
const options = program.opts();

if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}

let data;
let jsonData;
let filteredData = jsonData;

if (options.furnished) {
    filteredData = filteredData.filter(item => item.furnishingstatus && item.furnishingstatus.toLowerCase() === 'furnished');
}

if (options.price !== undefined) {
    filteredData = filteredData.filter(item => item.price && Number(item.price) < options.price);
}

let outputData = "";
for (let item of filteredData) {
    outputData += item.price + " " + item.area + "\n";
}

if (options.output) {
    fs.writeFileSync(options.output, outputData, 'utf8');
}

if (options.display) {
    console.log(outputData);
}
