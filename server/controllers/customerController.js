const prisma = require("../config/prisma");


// ======================================
// CREATE CUSTOMER
// POST /api/customers
// ======================================

exports.createCustomer = async (req, res) => {
  try {

    const {
      name,
      email,
      phone,
      address,
    } = req.body;


    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Customer name is required",
      });
    }


    const customer = await prisma.customer.create({

      data: {
        name,
        email,
        phone,
        address,
      },

    });


    res.status(201).json({

      success: true,
      message: "Customer created successfully",
      data: customer,

    });


  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }
};



// ======================================
// GET ALL CUSTOMERS
// GET /api/customers
// ======================================

exports.getCustomers = async (req, res) => {
  try {

    const customers = await prisma.customer.findMany({

      orderBy: {
        id: "desc",
      },

    });


    res.status(200).json({

      success: true,
      data: customers,

    });


  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,
      message: "Failed to fetch customers",

    });

  }
};



// ======================================
// GET CUSTOMER BY ID
// GET /api/customers/:id
// ======================================

exports.getCustomerById = async (req, res) => {

  try {

    const id = Number(req.params.id);


    const customer = await prisma.customer.findUnique({

      where: {
        id,
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
      data: customer,

    });


  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,
      message: "Failed to fetch customer",

    });

  }

};



// ======================================
// UPDATE CUSTOMER
// PUT /api/customers/:id
// ======================================

exports.updateCustomer = async (req, res) => {

  try {

    const id = Number(req.params.id);


    const customer = await prisma.customer.update({

      where: {
        id,
      },


      data: {

        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,

      },

    });


    res.status(200).json({

      success: true,
      message: "Customer updated successfully",
      data: customer,

    });


  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,
      message: "Failed to update customer",

    });

  }

};



// ======================================
// DELETE CUSTOMER
// DELETE /api/customers/:id
// ======================================

exports.deleteCustomer = async (req, res) => {

  try {

    const id = Number(req.params.id);


    await prisma.customer.delete({

      where: {
        id,
      },

    });


    res.status(200).json({

      success: true,
      message: "Customer deleted successfully",

    });


  } catch (error) {

    console.error(error);


    res.status(500).json({

      success: false,
      message: "Failed to delete customer",

    });

  }

};