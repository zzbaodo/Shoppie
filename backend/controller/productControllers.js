import Product from "../models/productModel.js"
import asyncHandler from "express-async-handler"
import products from "../data/products.js"

//@desc         Fetch all products
//@route        /api/products/
//@access       Public
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {}
  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

//@desc         Fetch one product
//@route        /api/products/:id
//@access       Public
export const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("Products not found")
  }
})

//@desc         Delete one product
//@route        DELETE/api/products/:id
//@access       Private/admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: "Product successfully removed" })
  } else {
    res.status(404)
    throw new Error("Products not found")
  }
})

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
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

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
  } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.brand = brand
    product.image = image
    product.category = category
    product.countInStock = countInStock
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
  const updatedProduct = await product.save()
  res.status(201).json(updatedProduct)
})

//@desc         Product review
//@route        POST /api/products/:id/reviews
//@access       Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error("Product already review")
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length
    await product.save()
    res.status(201).json({ message: "Review Added" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
  const updatedProduct = await product.save()
  res.status(201).json(updatedProduct)
})

//@desc         Get top Rated products
//@route        Get /api/products/top
//@access       Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.json(products)
})
