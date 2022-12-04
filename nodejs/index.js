const fs = require("fs").promises;

async function getSum() {
  let data = await fs.readFile("./data.json", "utf-8");
  data = JSON.parse(data);
  let sum = 0;
  for (let user of data) {
    sum = sum + user.salary;
  }
  console.log(sum);
}

// getSum();

const http = require("http");
const url = require("url");

const server = http.createServer(async (req, res) => {
  console.log("Server is now running");
  //   res.writeHead(200, { "Content-Type": "text/html" });
  //   res.end("Hi Omid");
  //
  //   const data = await fs.readFile("./server.html", "utf-8");
  //   res.writeHead(200, { "Content-Type": "text/html" });
  //   res.end(data);
  //
  // const myURL = new URL(req.url, "http://localhost:3000/");
  // console.log(myURL);
  // res.end("url");
});

server.listen(3000);
