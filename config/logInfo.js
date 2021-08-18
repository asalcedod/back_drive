require("dotenv").config();
const { createLogger, transports, format } = require("winston");
require("winston-mongodb");

const logInfo = createLogger({
  levels: {
    info: 3,
  },
  transports: [
    new transports.MongoDB({
      level: "info",
      db: process.env.MONGODB_URL,
      collection: "logs",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = logInfo;
