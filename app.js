const express = require("express");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const getUsers = require("./routes/users");
const tokenverify = require("./middleware/tokenverify");
const connectdb = require("./config/database");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 19,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

const corsOptions = {
  origin: "https://tothambrus11.github.io",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(limiter);

connectdb();

app.get("/api", (req, res) => {
  console.log("Database_URL", process.env.DB_CONNECTION);
  res.json("welcome");
});

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/", tokenverify, postRoutes);
app.use("/", tokenverify, getUsers);

app.listen(process.env.PORT || 8000);
