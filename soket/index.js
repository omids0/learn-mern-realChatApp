const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const expressServer = http.createServer(app);
const io = new Server(expressServer);

// io.on("connection", (socket) => {
//   console.log("New User connected...");
//   socket.on("disconnect", () => console.log("user disconnected"));

//server to client ❌
//   setTimeout(() => {
//     socket.send("hello this is massage from server 🎃");
//   }, 5000);

//   setInterval(() => {
//     const date = new Date();
//     const time = date.getTime();
//     socket.send(time);
//   }, 1000);

//NOTE: CUSTOM EVENT
//   setInterval(() => {
//     const date = new Date();
//     const time = date.getTime();
//     socket.emit("myEvent", time);
//   }, 1000);

//client to server ❌
//   socket.on("message", function (msg) {
//     console.log(msg);
//   });

//broadcasting ❌
//   io.sockets.emit("myBroadcast", "hello easy learning...");

// });

//namespace ❌ : assigining differnt endpoints or paths - namespace are created on the server side
let buyNsp = io.of("/buy");
buyNsp.on("connection", (socket) => {
  buyNsp.emit("myEvent", "hello buy");
});

let sellNsp = io.of("/sell");
sellNsp.on("connection", (socket) => {
  sellNsp.emit("myEvent", "hello sell");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(3000, () => console.log("Socket Server Is Up!"));
