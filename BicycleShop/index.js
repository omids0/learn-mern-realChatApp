const http = require("http");
const url = require("url");
const fs = require("fs").promises;

const server = http.createServer(async (req, res) => {
  //   if (req.url === "/favicon.ico") return;

  const myUrl = new URL(req.url, `http://${req.headers.host}/`);
  const patchname = myUrl.pathname;
  const id = myUrl.searchParams.get("id");
  //   console.log(patchname, id, user);
  if (patchname === "/") {
    const html = await fs.readFile("./view/bicycles.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  } else if (patchname === "/bicycle" && id >= 0 && id <= 5) {
    const html = await fs.readFile("./view/overview.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<div><h1> File Not Found.</h1></div>");
  }

  //   res.writeHead(200, { "Content-Type": "text/html" });
  //   res.end("<h1>Server Is Up..</h1>");
});

server.listen(4000);
