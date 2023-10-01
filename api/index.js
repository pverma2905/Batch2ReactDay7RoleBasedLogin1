const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectdb = require("./db/conn");
const userRouter = require("./routes/userRouter");

connectdb();
let port = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", userRouter);

app.listen(3001, () => {
  console.log(`server start on ${port}`);
});
