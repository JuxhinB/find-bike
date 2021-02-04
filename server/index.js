const { Express } = require('express');
const source = require('./dist/app');

/** @type {Express} */
const app = source.app;
const PORT = 7777;

// app.listen(PORT, function () {
//   console.log(`Server listening on port ${PORT}...`);
// });

module.exports = {
  app,
  port: PORT,
};
