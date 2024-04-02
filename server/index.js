const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5001;
const uri = process.env.ATLAS_URI;

app.listen(port, () => {
  console.log("server listening on port " + port);
});

mongoose
  .connect(uri, {})
  .then(() => console.log("Mongodb connection established"))
  .catch((err) => console.log("Mongodb connection failed:", err.message));
