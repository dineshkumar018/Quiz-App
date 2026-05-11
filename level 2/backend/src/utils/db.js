const mongoose = require("mongoose");
require("dotenv").config();

const db = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Mongodb connected...");
    })
    .catch(() => {
      console.log("Error connecting in Mongodb ");
    });
};

module.exports = db;
