"use strict";

var express = require("express");

var products = require("./data/products");

var app = express();
app.get("/", function (req, res) {
  res.send("API запущен...");
});
app.get("/api/products", function (req, res) {
  res.json(products);
});
app.get("/api/products/:id", function (req, res) {
  var productId = req.params.id;
  var product = products.find(function (p) {
    return p._id === productId;
  });
  if (product) res.json(product);else res.status(404).json({
    msg: "Товар не найден"
  });
});
app.listen(5000, console.log("Server running on port 5000"));