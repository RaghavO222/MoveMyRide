const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const backend = express();
const routes = require("./routes");
require("dotenv").config();

backend.use(express.json());

backend.use(cors({
  origin: "*",
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
})
);

backend.use(routes);

mongoose.connect(process.env.MDB)
.then(() =>
    console.log("Mongo Connected")
  )
  .then(() => {
    backend.listen(process.env.PORT, () => {
      console.log("Server started on port", (process.env.PORT));
    });
  })
  .catch((err) => console.log(err));