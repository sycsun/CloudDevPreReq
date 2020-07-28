'use strict';

const fs = require('fs');

fs.readFile('src/file.csv', 'utf-8', (err, file) => {
  if (err) {
    console.error(err);
  } else {
    console.log(file);
  }
});
