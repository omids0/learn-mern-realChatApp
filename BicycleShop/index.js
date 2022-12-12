const http = require("http");
const url = require("url");
const fs = require("fs").promises;

const server = http.createServer(async (req, res) => {
  //   if (req.url === "/favicon.ico") return;

  const myUrl = new URL(req.url, `http://${req.headers.host}/`);
  const patchname = myUrl.pathname;
  const id = myUrl.searchParams.get("id");
  const bicycles = require("./data.json");

  if (patchname === "/") {
    let html = await fs.readFile("./view/bicycles.html", "utf-8");
    let AllMainBicycles = await fs.readFile("./view/main/bmain.html", "utf-8");

    let allTheBicycles = "";

    for (let index = 0; index < 6; index++) {
      allTheBicycles += reMap(AllMainBicycles, bicycles[index]);
    }

    html = html.replace(/<%AllMainBicycles%>/g, allTheBicycles);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  } else if (patchname === "/bicycle" && id >= 0 && id <= 5) {
    let html = await fs.readFile("./view/overview.html", "utf-8");

    const bicycle = bicycles.find((b) => b.id === id);

    html = html.replace(/<%NAME%>/g, bicycle.name);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<div><h1> File Not Found.</h1></div>");
  }
});

server.listen(4000);

const reMap = (html, bicycle) => {
  html = html.replace(/<%ID%>/g, bicycle.id);
  html = html.replace(/<%NAME%>/g, bicycle.name);
  return html;
};
