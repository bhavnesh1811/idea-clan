const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Api is running",
    status: 0,
    error: false,
  });
});

app.use("/users", userRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }

  console.log("Server is running on port number", process.env.PORT);
});
