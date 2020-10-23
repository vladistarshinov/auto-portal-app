import express from 'express'
import dotenv from "dotenv"
import colors from "colors"
import connectDB from "./config/db"
import products from './data/products'

dotenv.config()

connectDB()

const app = express()

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.send("API запущен...")
})

app.get("/api/products", (req, res) => {
    res.json(products)
})

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id
    const product = products.find(p => p._id === productId)
    if (product)
      res.json(product)
    else
      res.status(404).json({msg: "Товар не найден"})
})

app.listen(PORT, 
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold) 
)