'use strict';

const fs = require('fs');

try {
  const file = fs.readFileSync('src/file.csv', 'utf-8');
  console.log(file);
} catch (err) {
  console.error(err);
}
