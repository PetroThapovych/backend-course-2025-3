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

// Перевірка наявності файлу
if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}

// Читаємо файл
let data;
try {
    data = fs.readFileSync(options.input, 'utf8');
} catch (err) {
    console.error("Error reading file:", err.message);
    process.exit(1);
}

// Парсимо JSON
let jsonData;
try {
    jsonData = JSON.parse(data);
} catch (err) {
    console.error("Invalid JSON format");
    process.exit(1);
}

// Фільтруємо дані
let filteredData = jsonData;

if (options.furnished) {
    filteredData = filteredData.filter(item => item.furnishingstatus && item.furnishingstatus.toLowerCase() === 'furnished');
}

if (options.price !== undefined) {
    filteredData = filteredData.filter(item => item.price && Number(item.price) < options.price);
}

// Формуємо рядки для виводу (price та area)
const outputData = filteredData.map(item => `${item.price} ${item.area}`).join('\n');

// Записуємо у файл або виводимо у консоль
if (options.output) {
    fs.writeFileSync(options.output, outputData, 'utf8');
}

if (options.display) {
    console.log(outputData);
}
