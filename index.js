const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI, {
    //   useNewUserParser: true,
    //   userUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Conneted..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!123");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
