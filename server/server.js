import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import userRoute from './routes/userRoute.js'

dotenv.config();

const app = express();
ConnectDB();
app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoute)

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running on mode ${process.env.NODE_ENV} on server: ${PORT} `
  )
);
