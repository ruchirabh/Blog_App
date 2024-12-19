const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./Components/controller/usercontroller");
const blogroutes = require("./Components/controller/blogController")
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // This will allow all origins

const PORT = process.env.PORT;
const MONGO_URL = process.env.Mongo_url;
app.use("/api/users", userRoutes);
app.use(blogroutes)

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log(`connected to database`);

    app.listen(PORT, () => {
      console.log(`Sever is Running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
