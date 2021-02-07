const express = require("express");
const source = require("./dist/app");

/** @type {express.Express} */
const app = express();
// const PORT = proccess ? process.env.PORT : 7777;
const PORT = 7777;

app.use("/", express.static("../build"));
app.use("/api", source.app);

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}...`);
});
