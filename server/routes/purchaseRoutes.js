const express = require("express");

const router = express.Router();

const {
    createPurchase,
    getAllPurchases,
    getPurchaseById,
    updatePurchaseStatus,
    deletePurchase
} = require("../controllers/purchaseController");


const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


// ======================================
// PURCHASE ROUTES
// ======================================


// Create Purchase
// ADMIN + MANAGER

router.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN", "MANAGER"),
    createPurchase
);


// Get All Purchases
// ADMIN + MANAGER + EMPLOYEE

router.get(
    "/",
    authMiddleware,
    getAllPurchases
);


// Get Purchase By ID

router.get(
    "/:id",
    authMiddleware,
    getPurchaseById
);


// Update Purchase Status
// ADMIN + MANAGER

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN", "MANAGER"),
    updatePurchaseStatus
);


// Delete Purchase
// ADMIN ONLY

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    deletePurchase
);


module.exports = router;