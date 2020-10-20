import express from 'express';
import products from './data/products';

const app = express();

app.get("/", (req, res) => {
    res.send("API запущен...");
});

app.get("/api/products", (req, res) => {
    res.json(products);
});

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = products.find(p => p._id === productId);
    if (product)
      res.json(product);
    else
      res.status(404).json({msg: "Товар не найден"});
});

app.listen(5000, () => { console.log("Server running on port 5000") });