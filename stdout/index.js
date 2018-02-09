const fs = require("fs");
const util = require("util");
const path = require("path");

const logPath = path.join(__dirname, "debug.log");
const stream = fs.createWriteStream(logPath, { flags: "w" });

console.log = d => {
  stream.write(util.format(d) + "\n");
};

let i = 0;
const log = () => {
  console.log(`foo bar ${i}`);
  i += 1;
};

setInterval(log, 1000);