const express = require("express");

const app = express();


// Middleware

app.use(express.json());


// Routes

const authRoutes = require("./routes/authRoutes");

const testRoutes = require("./routes/testRoutes");

const categoryRoutes = require("./routes/categoryRoutes");

const productRoutes = require("./routes/productRoutes");



// API Routes

app.use("/api/auth", authRoutes);

app.use("/api/test", testRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/products", productRoutes);



// Default Route

app.get("/", (req, res) => {

    res.json({

        message: "Inventra ERP API Running 🚀"

    });

});



module.exports = app;