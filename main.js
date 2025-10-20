#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';

const program = new Command();

program
    .requiredOption('-i, --input <path>', 'шл€х до файлу дл€ читанн€')
    .option('-o, --output <path>', 'шл€х до файлу дл€ запису результату')
    .option('-d, --display', 'вивести результат у консоль');

program.parse(process.argv);

const options = program.opts();

// ѕерев≥рка на€вност≥ обовТ€зкового параметра
if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

// ѕерев≥рка ≥снуванн€ файлу дл€ читанн€
if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}

// „итанн€ даних з файлу
const data = fs.readFileSync(options.input, 'utf8');
let result;

try {
    const jsonData = JSON.parse(data);
    result = JSON.stringify(jsonData, null, 2);
} catch (err) {
    console.error("Invalid JSON format");
    process.exit(1);
}

// якщо задано параметр -o, записуЇмо у файл
if (options.output) {
    fs.writeFileSync(options.output, result, 'utf8');
}

// якщо задано параметр -d, виводимо у консоль
if (options.display) {
    console.log(result);
}
#!/usr/bin / env node
import { Command } from 'commander';
import fs from 'fs';

const program = new Command();

program
    .requiredOption('-i, --input <path>', 'шл€х до файлу дл€ читанн€')
    .option('-o, --output <path>', 'шл€х до файлу дл€ запису результату')
    .option('-d, --display', 'вивести результат у консоль');

program.parse(process.argv);

const options = program.opts();

// ѕерев≥рка на€вност≥ обовТ€зкового параметра
if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

// ѕерев≥рка ≥снуванн€ файлу дл€ читанн€
if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}

// „итанн€ даних з файлу
const data = fs.readFileSync(options.input, 'utf8');
let result;

try {
    const jsonData = JSON.parse(data);
    result = JSON.stringify(jsonData, null, 2);
} catch (err) {
    console.error("Invalid JSON format");
    process.exit(1);
}

// якщо задано параметр -o, записуЇмо у файл
if (options.output) {
    fs.writeFileSync(options.output, result, 'utf8');
}

// якщо задано параметр -d, виводимо у консоль
if (options.display) {
    console.log(result);
}
