#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';

const program = new Command();

program
    .requiredOption('-i, --input <path>', '���� �� ����� ��� �������')
    .option('-o, --output <path>', '���� �� ����� ��� ������ ����������')
    .option('-d, --display', '������� ��������� � �������');

program.parse(process.argv);

const options = program.opts();

// �������� �������� ������������ ���������
if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

// �������� ��������� ����� ��� �������
if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}

// ������� ����� � �����
const data = fs.readFileSync(options.input, 'utf8');
let result;

try {
    const jsonData = JSON.parse(data);
    result = JSON.stringify(jsonData, null, 2);
} catch (err) {
    console.error("Invalid JSON format");
    process.exit(1);
}

// ���� ������ �������� -o, �������� � ����
if (options.output) {
    fs.writeFileSync(options.output, result, 'utf8');
}

// ���� ������ �������� -d, �������� � �������
if (options.display) {
    console.log(result);
}
#!/usr/bin / env node
import { Command } from 'commander';
import fs from 'fs';

const program = new Command();

program
    .requiredOption('-i, --input <path>', '���� �� ����� ��� �������')
    .option('-o, --output <path>', '���� �� ����� ��� ������ ����������')
    .option('-d, --display', '������� ��������� � �������');

program.parse(process.argv);

const options = program.opts();

// �������� �������� ������������ ���������
if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

// �������� ��������� ����� ��� �������
if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}

// ������� ����� � �����
const data = fs.readFileSync(options.input, 'utf8');
let result;

try {
    const jsonData = JSON.parse(data);
    result = JSON.stringify(jsonData, null, 2);
} catch (err) {
    console.error("Invalid JSON format");
    process.exit(1);
}

// ���� ������ �������� -o, �������� � ����
if (options.output) {
    fs.writeFileSync(options.output, result, 'utf8');
}

// ���� ������ �������� -d, �������� � �������
if (options.display) {
    console.log(result);
}
