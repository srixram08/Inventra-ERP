const express = require("express");
const cors = require("cors");

const app = express();

// ======================================
// Middleware
// ======================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================================
// Routes
// ======================================

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const customerRoutes = require("./routes/customerRoutes");

const inventoryRoutes = require("./routes/inventoryRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const saleRoutes = require("./routes/saleRoutes");

// ======================================
// API Routes
// ======================================

app.use("/api/auth", authRoutes);

app.use("/api/test", testRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/products", productRoutes);

app.use("/api/suppliers", supplierRoutes);

app.use("/api/customers", customerRoutes);

app.use("/api/inventory", inventoryRoutes);

app.use("/api/purchases", purchaseRoutes);

app.use("/api/sales", saleRoutes);

// ======================================
// Home Route
// ======================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Inventra ERP API 🚀",
        version: "1.0.0",
        modules: [
            "Authentication",
            "Category Management",
            "Product Management",
            "Supplier Management",
            "Customer Management",
            "Inventory Management",
            "Purchase Management",
            "Sales Management"
        ]
    });
});

// ======================================
// 404 Route
// ======================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// ======================================
// Export App
// ======================================

module.exports = app;