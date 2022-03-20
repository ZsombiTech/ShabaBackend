const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const tokenverify = require("./middleware/tokenverify");
require("dotenv/config");
const app = express();

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("dDd");
});

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/", tokenverify, postRoutes);

app.get("/api", (req, res) => {
  res.json("welcome");
});

app.listen(8000);
