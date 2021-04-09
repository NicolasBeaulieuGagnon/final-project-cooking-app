const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const PORT = 31415;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  .listen(PORT, function () {
    console.info("🌍 Listening on port ", PORT);
  });
