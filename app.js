const express = require("express");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const tokenverify = require("./middleware/tokenverify");
const connectdb = require("./config/database");
const cors = require("cors");

const app = express();

app.use(cors());

connectdb();

app.get("/api", (req, res) => {
  res.json("welcome");
});

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/", tokenverify, postRoutes);

app.listen(8000);
