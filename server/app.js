const express = require("express");
require("dotenv").config();
const ejs = require("ejs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./Middlewares/error");
const path = require("path");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cors());

// ✅ Test route
app.get("/test", (req, res) => {
  res.json({ msg: "Backend working" });
});

// ✅ Dummy products API (IMPORTANT)
app.get("/api/v1/products", (req, res) => {
  const products = [
    {
      _id: "1",
      name: "iPhone 14",
      price: 70000,
      images: [{ url: "https://via.placeholder.com/150" }],
    },
    {
      _id: "2",
      name: "Samsung Galaxy",
      price: 50000,
      images: [{ url: "https://via.placeholder.com/150" }],
    },
    {
      _id: "3",
      name: "Laptop",
      price: 80000,
      images: [{ url: "https://via.placeholder.com/150" }],
    },
  ];

  res.json({
    success: true,
    products,
  });
});

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error middleware
app.use(errorMiddleware);

module.exports = app;
