require("dotenv").config();
const { createLogger, transports, format } = require("winston");
require("winston-mongodb");

const logError = createLogger({
  levels: {
    error: 2,
  },
  transports: [
    new transports.MongoDB({
      level: "error",
      db: process.env.MONGODB_URL,
      collection: "errors",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
},{});

module.exports = logError;
