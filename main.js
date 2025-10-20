const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

program
    .requiredOption('-i, --input <path>', '���� �� ����� ��� �������')
    .option('-o, --output <path>', '���� �� ����� ��� ������ ����������')
    .option('-d, --display', '������� ��������� � �������')
    .option('-f, --furnished', '���������� ���� ������� � �������')
    .option('-p, --price <number>', '���������� ���� ������� � ����� ������ �� ���������', parseFloat);

program.parse(process.argv);

const options = program.opts();

// �������� �������� �����
if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}

// ������ ����
let data;
try {
    data = fs.readFileSync(options.input, 'utf8');
} catch (err) {
    console.error("Error reading file:", err.message);
    process.exit(1);
}

// ������� JSON
let jsonData;
try {
    jsonData = JSON.parse(data);
} catch (err) {
    console.error("Invalid JSON format");
    process.exit(1);
}

// Գ������� ���
let filteredData = jsonData;

if (options.furnished) {
    filteredData = filteredData.filter(item => item.furnishingstatus && item.furnishingstatus.toLowerCase() === 'furnished');
}

if (options.price !== undefined) {
    filteredData = filteredData.filter(item => item.price && Number(item.price) < options.price);
}

// ������� ����� ��� ������ (price �� area)
const outputData = filteredData.map(item => `${item.price} ${item.area}`).join('\n');

// �������� � ���� ��� �������� � �������
if (options.output) {
    fs.writeFileSync(options.output, outputData, 'utf8');
}

if (options.display) {
    console.log(outputData);
}
