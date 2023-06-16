const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const connectDb = require("./db/dbConnect");
const cors = require("cors");
connectDb();

const port = process.env.PORT || 5000;

const app = express();

const router = express.Router();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
app.use(express.urlencoded({ extended: false }));

app.use("/", (req, res) => {
  res.json({ message: "server successful" });
});

app.use("/users", require("./app/routes/userRoutes"));

app.listen(port, () => {
  console.log(`server started at port http://localhost:${port}/`);
});

app.use("/.netlify/functions/index", router);

module.exports.handler = serverless(app);
