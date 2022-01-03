import express from 'express'
import dotenv from "dotenv";
import path from 'path';
import colors from "colors";
import connectDB from "./config/db.js";
import morgan from 'morgan';

import { notFound, errorHandler } from './middleware/error.middleware.js';
import orderController from './controllers/order.controller.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import orderRoutes from './routes/order.routes.js';
import uploadRoutes from './routes/upload.routes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("API запущен...");
});

app.use("/api/users", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.get("/api/config/paypal", orderController.payingOrder);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, 
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);