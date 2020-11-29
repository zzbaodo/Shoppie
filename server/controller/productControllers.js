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

//@desc         Delete one product
//@route        DELETE/api/products/:id
//@access       Private/admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product successfully removed" });
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

//@desc         CREATE one product
//@route        Post /api/products
//@access       Private/admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc         Update one product
//@route        Put /api/products/:id
//@access       Private/admin
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    countInStock,
    category,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.brand = brand;
    product.image = image;
    product.category = category;
    product.countInStock = countInStock;
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
  const updatedProduct = await product.save();
  res.status(201).json(updatedProduct);
});
