'use strict';
const fs = require('fs');
const express = require('express');

const app = express();
const content = 'Pointless'.repeat(50000000);

app.post('/long-running-operation', (req, res) => {
  fs.writeFileSync('large-file.txt', content);
  res.send('done');
});

app.get('/greeting', (req, res) => {
  res.send('Howdy');
});

app.listen(3000);
