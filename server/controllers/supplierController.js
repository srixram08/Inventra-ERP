const prisma = require("../config/prisma");

// Create Supplier
const createSupplier = async (req, res) => {
  try {
    const { name, companyName, email, phone, address } = req.body;

    const supplier = await prisma.supplier.create({
      data: {
        name,
        companyName,
        email,
        phone,
        address,
      },
    });

    res.status(201).json({
      success: true,
      message: "Supplier Created Successfully",
      supplier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Suppliers
const getSuppliers = async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany();

    res.status(200).json({
      success: true,
      suppliers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Supplier By ID
const getSupplierById = async (req, res) => {
  try {
    const supplier = await prisma.supplier.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }

    res.status(200).json({
      success: true,
      supplier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Supplier
const updateSupplier = async (req, res) => {
  try {
    const supplier = await prisma.supplier.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      message: "Supplier Updated Successfully",
      supplier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Supplier
const deleteSupplier = async (req, res) => {
  try {
    await prisma.supplier.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Supplier Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};