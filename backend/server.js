import express from 'express'
import dotenv from "dotenv"
import colors from "colors"
import connectDB from "./config/db"

import productRoutes from './routes/product.routes'

dotenv.config()

connectDB()

const app = express()

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.send("API запущен...")
})

app.use("/api/products", productRoutes)

app.use((req, res, next) => {
  console.log(req.originalUrl)
  next()
})

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
})

app.listen(PORT, 
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold) 
)