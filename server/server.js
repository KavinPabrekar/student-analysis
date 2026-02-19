require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const analysisRoutes = require("./routes/analysis");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://student:student123@cluster0.mxrsvi0.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

  


app.use("/auth", authRoutes);
app.use("/analysis", analysisRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
