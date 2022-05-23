const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');
const rl = readline.createInterface(process.stdin);

writeStream.on('open', () => {
  console.log('Hello! Enter your text:');
  rl.on('line', (line) => {
    if (line === 'exit') {
      console.log('Good luck! See you later!');
      process.exit();
    };

    writeStream.write(line + '\n');
  });
});

process.on('SIGINT',  () => {
  console.log('Good luck! See you later!');
  process.exit();
});





