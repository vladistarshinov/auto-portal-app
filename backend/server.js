import express from 'express'
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db";

import { notFound, errorHandler } from './middleware/error.middleware';
import productRoutes from './routes/product.routes';
import userRoutes from './routes/user.routes';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("API запущен...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, 
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);