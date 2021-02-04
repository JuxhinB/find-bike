const path = require('path');
const express = require('express');
const server = require('./server');

const app = express();

const {
  app: api,
  port
} = server;

app.use('/', express.static('web/build'));
app.use('/api', api);
// app.use('/', function (req, res, next) {
//   res.sendFile(path.join(__dirname, 'web', 'build', 'index.html'));
// });

app.listen(port, function () {
  console.log(`Server listening on port ${port}...`);
});
