import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

//@desc         Fetch all products
//@route        /api/products/
//@access       Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc         Fetch one product
//@route        /api/products/:id
//@access       Public
export const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});
