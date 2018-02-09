const http = require("http");
const serverName = process.env.SERVER_NAME || "default";
const port = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/plan"});
  res.end(`Hello World from server ${serverName}`);
});

server.listen(port);

console.log(`Sever running at http://127.0.0.1:${port}`);
