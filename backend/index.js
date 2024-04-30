const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

const { User, Bank } = require("./dbSchema");

app.get("/", (req, res) => {
  User.create({
    username: "test01",
    password: "test@#2024",
    firstName: "Test",
  });

  res.send("Test user created on db.");
});

// This redirect all the url with prefix /api/v1
app.use("/api/v1", mainRouter);

const startApp = async () => {
  try {
    const port = process.env.PORT || 3000;
    const connectionUrl = process.env.URL;
    await mongoose.connect(connectionUrl);
    app.listen(port, () => {
      console.log("Server started at port " + port);
    });
  } catch (e) {
    console.log(e);
  }
};

startApp();
