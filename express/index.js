const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

//middleware
app.use((req, res, next) => {
  console.log("Hi i am from middleware");
  next();
});

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

app.listen(4000, () => console.log("Server Is running at port 4000 ✨"));
