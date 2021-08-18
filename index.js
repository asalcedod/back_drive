require("dotenv").config();
const enviroment = require("./config/enviroment");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db");
const userRouter = require("./routes/user-router");
const driverRouter = require("./routes/driver-router");
const passengerRouter = require("./routes/passenger-router");
const rolRouter = require("./routes/rol-router");
const travelRouter = require("./routes/travel-router");

const app = express();

const apiPort = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", userRouter);
app.use("/api", rolRouter);
app.use("/api", driverRouter);
app.use("/api", passengerRouter);
app.use("/api", travelRouter);

app.listen(apiPort, () =>
  console.log(`Server running: ${enviroment.ApiUrl()}`)
);
