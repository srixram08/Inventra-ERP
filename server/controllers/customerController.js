const prisma = require("../config/prisma");

// ==============================
// CREATE CUSTOMER
// ==============================

const createCustomer = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      country,
      pincode,
    } = req.body;

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        address,
        city,
        state,
        country,
        pincode,
      },
    });

    res.status(201).json({
      success: true,
      message: "Customer Created Successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// GET ALL CUSTOMERS
// ==============================

const getCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();

    res.status(200).json({
      success: true,
      customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// GET CUSTOMER BY ID
// ==============================

const getCustomerById = async (req, res) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// UPDATE CUSTOMER
// ==============================

const updateCustomer = async (req, res) => {
  try {
    const customer = await prisma.customer.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      message: "Customer Updated Successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// DELETE CUSTOMER
// ==============================

const deleteCustomer = async (req, res) => {
  try {
    await prisma.customer.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Customer Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};