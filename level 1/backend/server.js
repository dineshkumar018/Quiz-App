const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const questionRoutes = require("./routes/question-routes")
require("dotenv").config({ path: "local.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("mongoDB connnected successfully");
  } catch (error) {
    console.error("MongoDB connection error : ", error.message);
    process.exit(1);
  }
};

const app = express();

app.use(express.json());
app.use(cors());

app.use("/v1/questions", questionRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

const PORT = process.env.PORT;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

const startTime = new Date();

startServer().then(async () => {
  console.log(`HTTP server started. Time taken : ${new Date() - startTime}`);
});
