const prisma = require("../config/prisma");


// ==============================
// CREATE PRODUCT
// ==============================

exports.createProduct = async (req, res) => {

    try {

        const {
            name,
            description,
            sku,
            price,
            stock,
            categoryId
        } = req.body;


        const product = await prisma.product.create({

            data: {
                name,
                description,
                sku,
                price,
                stock,
                categoryId
            }

        });


        res.status(201).json({

            success: true,

            message: "Product Created Successfully",

            product

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ==============================
// GET ALL PRODUCTS
// ==============================

exports.getProducts = async (req, res) => {

    try {

        const products = await prisma.product.findMany({

            include: {
                category: true
            }

        });


        res.status(200).json({

            success: true,

            products

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ==============================
// GET SINGLE PRODUCT
// ==============================

exports.getProductById = async (req, res) => {

    try {

        const product = await prisma.product.findUnique({

            where: {
                id: Number(req.params.id)
            },

            include: {
                category: true
            }

        });



        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product Not Found"

            });

        }



        res.status(200).json({

            success: true,

            product

        });



    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ==============================
// UPDATE PRODUCT
// ==============================

exports.updateProduct = async (req, res) => {

    try {


        const product = await prisma.product.update({

            where: {

                id: Number(req.params.id)

            },


            data: req.body


        });



        res.status(200).json({

            success: true,

            message: "Product Updated Successfully",

            product

        });



    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }

};



// ==============================
// DELETE PRODUCT
// ==============================

exports.deleteProduct = async (req, res) => {

    try {


        await prisma.product.delete({

            where: {

                id: Number(req.params.id)

            }

        });



        res.status(200).json({

            success: true,

            message: "Product Deleted Successfully"

        });



    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }

};