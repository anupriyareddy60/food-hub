const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
  });

// Food schema
const foodSchema = new mongoose.Schema({
  name: String,
  restaurant: String,
  category: String,
  price: Number,
  description: String,
  rating: Number,
  available: {
    type: Boolean,
    default: true
  }
});

// Restaurant schema
const restaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  cuisine: String,
  rating: Number
});

// Order schema
const orderSchema = new mongoose.Schema({
  customerName: String,
  items: Array,
  totalAmount: Number,
  address: String,
  status: {
    type: String,
    default: "Pending"
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

// Review schema
const reviewSchema = new mongoose.Schema({
  customerName: String,
  foodName: String,
  rating: Number,
  comment: String,
  date: {
    type: Date,
    default: Date.now
  }
});

// Models
const Food = mongoose.model("Food", foodSchema);
const Restaurant = mongoose.model("Restaurant", restaurantSchema);
const Order = mongoose.model("Order", orderSchema);
const Review = mongoose.model("Review", reviewSchema);

// Get all food
app.get("/api/foods", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all restaurants
app.get("/api/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add food
app.post("/api/foods", async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();

    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Place order
app.post("/api/orders", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add review
app.post("/api/reviews", async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/// Get reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🍔 FoodHub running at http://localhost:${PORT}`);
});