const express = require("express");
const cors = require("cors");
const db = require("./utils/db.js");
const userRouter = require("./routes/userRoutes.js");
const questionRouter = require("./routes/questionRoutes.js");
const { quizRouter } = require("./routes/quizRoutes.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

//express Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//DB connection
db();

//Routes Middleware
app.use("/api/v1/users", userRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/quiz", quizRouter);
// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});



//Connect Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ...`);
});
