const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'client', 'build')));

const notFound = 404;

app.get('/', (_req, res) => {
  res.sendCode(200);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const port = process.env.PORT || 8080;
const server = app.listen(port);

console.debug(`App is listening on port ${port}`);

module.exports = server;
