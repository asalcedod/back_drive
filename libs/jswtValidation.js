const express = require("express");
const jwt = require("jsonwebtoken");

const jswtValidation = express.Router();
jswtValidation.use((req, res, next) => {
  const token = req.headers["access-token"];

  if (token) {
    jwt.verify(token, "AuthLogin", (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválido" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: "No found Token.",
    });
  }
});

module.exports = jswtValidation;
