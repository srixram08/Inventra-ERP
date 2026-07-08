const express = require("express");

const router = express.Router();

const {
  getDashboardSummary,
  getRevenueAnalytics,
  getRecentSales,
} = require("../controllers/dashboardController");

const authMiddleware = require("../middleware/authMiddleware");


// ======================================
// DASHBOARD SUMMARY
// ======================================
// GET /api/dashboard/summary
router.get(
  "/summary",
  authMiddleware,
  getDashboardSummary
);


// ======================================
// REVENUE ANALYTICS
// ======================================
// GET /api/dashboard/revenue
router.get(
  "/revenue",
  authMiddleware,
  getRevenueAnalytics
);


// ======================================
// RECENT SALES
// ======================================
// GET /api/dashboard/recent-sales
router.get(
  "/recent-sales",
  authMiddleware,
  getRecentSales
);


module.exports = router;