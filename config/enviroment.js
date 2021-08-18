require("dotenv").config();

const ClientUrl = () => {
  switch (process.env.NODE_ENV) {
    case "local":
      return process.env.URL_LOCAL;
    case "development":
      return process.env.URL_DEV;
    case "production":
      return process.env.URL_PRODUCTION;
    default:
      return process.env.URL_LOCAL;
  }
};

const ApiUrl = () => {
  switch (process.env.NODE_ENV) {
    case "local":
      return `${process.env.API_LOCAL}:${process.env.PORT}`;
    case "development":
      return process.env.API_DEV;
    case "production":
      return process.env.API_PRODUCTION;
    default:
      return process.env.API_LOCAL;
  }
};

module.exports = {
  ClientUrl,
  ApiUrl,
};
