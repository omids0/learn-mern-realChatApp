const mongoose = require("mongoose");

const databaseConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongodb DataBase Connected 🎇");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = databaseConnect;
