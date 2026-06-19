const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/tonconnect-manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'tonconnect-manifest.json'));
});

app.get('*', (req, res) => {
  let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
  html = html
    .replace("'{{SERVER_URL}}'", `'${process.env.SERVER_URL || ''}'`)
    .replace("'{{ADMIN_USERNAME}}'", `'${process.env.ADMIN_USERNAME || ''}'`)
    .replace("'{{TRACK_HOST}}'", `'${process.env.TRACK_HOST || ''}'`);
  res.send(html);
});

app.listen(process.env.PORT || 3000);
