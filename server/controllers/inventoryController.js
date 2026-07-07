const prisma = require("../config/prisma");

// ==============================
// Stock In
// ==============================

exports.stockIn = async (req, res) => {
  try {
    const { productId, quantity, remarks } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid productId and quantity are required",
      });
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await prisma.product.update({
      where: { id: Number(productId) },
      data: {
        stock: {
          increment: Number(quantity),
        },
      },
    });

    const transaction = await prisma.inventoryTransaction.create({
      data: {
        productId: Number(productId),
        quantity: Number(quantity),
        type: "STOCK_IN",
        remarks,
      },
    });

    const updatedProduct = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    res.status(200).json({
      success: true,
      message: "Stock added successfully",
      stock: updatedProduct.stock,
      transaction,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Stock Out
// ==============================

exports.stockOut = async (req, res) => {
  try {
    const { productId, quantity, remarks } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid productId and quantity are required",
      });
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    await prisma.product.update({
      where: { id: Number(productId) },
      data: {
        stock: {
          decrement: Number(quantity),
        },
      },
    });

    const transaction = await prisma.inventoryTransaction.create({
      data: {
        productId: Number(productId),
        quantity: Number(quantity),
        type: "STOCK_OUT",
        remarks,
      },
    });

    const updatedProduct = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    res.status(200).json({
      success: true,
      message: "Stock removed successfully",
      stock: updatedProduct.stock,
      transaction,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Stock Adjustment
// ==============================

exports.adjustStock = async (req, res) => {
  try {
    const { productId, quantity, remarks } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "productId and quantity are required",
      });
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await prisma.product.update({
      where: { id: Number(productId) },
      data: {
        stock: Number(quantity),
      },
    });

    await prisma.inventoryTransaction.create({
      data: {
        productId: Number(productId),
        quantity: Number(quantity),
        type: "ADJUSTMENT",
        remarks,
      },
    });

    res.status(200).json({
      success: true,
      message: "Stock adjusted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Inventory History
// ==============================

exports.getHistory = async (req, res) => {
  try {
    const history = await prisma.inventoryTransaction.findMany({
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      count: history.length,
      history,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Low Stock
// ==============================

exports.lowStock = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        stock: {
          lte: 10,
        },
      },
      include: {
        category: true,
      },
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};