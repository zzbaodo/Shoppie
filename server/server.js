import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoutes.js";
import uploadRoute from "./routes/uploadRoutes.js";
import morgan from "morgan";

dotenv.config();

const app = express();
ConnectDB();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoute);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running on mode ${process.env.NODE_ENV} on server: ${PORT} `
  )
);
