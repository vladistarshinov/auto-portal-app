"use strict";

var _express = _interopRequireDefault(require("express"));

var _products = _interopRequireDefault(require("./data/products"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.get("/", function (req, res) {
  res.send("API запущен...");
});
app.get("/api/products", function (req, res) {
  res.json(_products["default"]);
});
app.get("/api/products/:id", function (req, res) {
  var productId = req.params.id;

  var product = _products["default"].find(function (p) {
    return p._id === productId;
  });

  if (product) res.json(product);else res.status(404).json({
    msg: "Товар не найден"
  });
});
app.listen(5000, function () {
  console.log("Server running on port 5000");
});