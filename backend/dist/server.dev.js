"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _db = _interopRequireDefault(require("./config/db"));

var _products = _interopRequireDefault(require("./data/products"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

(0, _db["default"])();
var app = (0, _express["default"])();
var PORT = process.env.PORT || 5000;
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
app.listen(PORT, console.log("Server running in ".concat(process.env.NODE_ENV, " mode on port ").concat(PORT)));