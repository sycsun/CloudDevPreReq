'use strict';
const fs = require('fs');
const express = require('express');

fs.writeFileSync('large-file.txt', 'Because I\'m happy. '.repeat(1000000));        

const app = express();

app.get('/large-file.txt', (req, res) => {
    const content = fs.readFileSync('large-file.txt', 'utf-8');
    res.send(content);
});

module.exports = app;
