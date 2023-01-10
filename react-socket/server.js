const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const expressServer = http.createServer(app);
const io = new Server(expressServer);

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.get("/express_server", (req, res) => {
  res.end("This is my backend server.");
});

io.on("connection", (socket) => {
  console.log("New User Connected 👤");

  setTimeout(() => {
    socket.emit("msg", "This is message from express server");
  }, 2000);

  socket.on("disconnect", () => console.log("User Disconnected"));
});

expressServer.listen(5000, () => console.log("Server Is Up... 🚀"));
