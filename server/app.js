const express = require("express");
const cors = require("cors");

const app = express();


// ===============================
// Middleware
// ===============================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));


// ===============================
// Routes
// ===============================

const authRoutes = require("./routes/authRoutes");

const testRoutes = require("./routes/testRoutes");

const categoryRoutes = require("./routes/categoryRoutes");

const productRoutes = require("./routes/productRoutes");

const supplierRoutes = require("./routes/supplierRoutes");

const customerRoutes = require("./routes/customerRoutes");

const inventoryRoutes = require("./routes/inventoryRoutes");

const purchaseRoutes = require("./routes/purchaseRoutes");



// ===============================
// API Routes
// ===============================


app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/test",
    testRoutes
);


app.use(
    "/api/categories",
    categoryRoutes
);


app.use(
    "/api/products",
    productRoutes
);


app.use(
    "/api/suppliers",
    supplierRoutes
);


app.use(
    "/api/customers",
    customerRoutes
);


app.use(
    "/api/inventory",
    inventoryRoutes
);


app.use(
    "/api/purchases",
    purchaseRoutes
);



// ===============================
// Home Route
// ===============================

app.get("/",(req,res)=>{

    res.status(200).json({

        success:true,

        message:"Welcome to Inventra ERP API 🚀"

    });

});



// ===============================
// 404 Handler
// ===============================

app.use((req,res)=>{

    res.status(404).json({

        success:false,

        message:"Route Not Found"

    });

});



module.exports = app;