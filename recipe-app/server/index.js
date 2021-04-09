const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const PORT = 31415;

express()
  .use(morgan("tiny"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  .listen(PORT, function () {
    console.info("🌍 Listening on port " + server.address().port);
  });
