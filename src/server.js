'use strict';
const fs = require('fs');
const express = require('express');

const app = express();
const content = 'Pointless'.repeat(100000000);

app.post('/long-running-operation', (req, res) => {
    fs.writeFileSync('large-file.txt', content);
    res.send('done');
});

app.get('/greeting', (req, res) => {
    res.send('Howdy');
});

module.exports = app;
