// Create server with express
//Step 1: npm i express
const express = require("express");
const bodyParser = require("body-parser");

//Step 2
const app = express();

//middleware
app.use((req, res, next) => {
  console.log("Hi i am from middleware");
  console.log(req.method);
  console.log(req.protocol);
  console.log(req.get("host"));
  console.log(req.originalUrl);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>hiii</h1>");
});

app.get("/about", (req, res) => {
  res.json({
    name: "Omid",
  });
});

app.post("/login", (res, req) => {
  console.log(req.body);
  res.send("User Login Successfull.");
});

//Step 3: listen...
app.listen(4000, () => console.log("Server Is running at port 4000 ✨"));
