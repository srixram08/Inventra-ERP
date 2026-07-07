const express = require("express");

const app = express();

// ==============================
// MIDDLEWARE
// ==============================

app.use(express.json());

// ==============================
// ROUTE IMPORTS
// ==============================

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const customerRoutes = require("./routes/customerRoutes");

// ==============================
// API ROUTES
// ==============================

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/customers", customerRoutes);

// ==============================
// HOME ROUTE
// ==============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Welcome to Inventra ERP API",
    version: "1.0.0",
  });
});

// ==============================
// 404 ROUTE
// ==============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ==============================
// EXPORT APP
// ==============================

module.exports = app;