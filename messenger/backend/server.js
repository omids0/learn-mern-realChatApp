const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

const dataBaseConnected = require("./config/database");
const authRouter = require("./routs/authRoute");

dotenv.config({
  path: "backend/config/config.env",
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/messenger", authRouter);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("This is from backend");
});

dataBaseConnected();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
