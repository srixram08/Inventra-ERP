const prisma = require("../config/prisma");


// ======================================
// CREATE PURCHASE
// ======================================

exports.createPurchase = async (req, res) => {

    try {

        const {
            supplierId,
            invoiceNumber,
            items
        } = req.body;


        if (!supplierId || !invoiceNumber || !items || items.length === 0) {

            return res.status(400).json({
                success: false,
                message: "Supplier, invoice number and items are required"
            });

        }


        const purchase = await prisma.$transaction(async (tx) => {


            let totalAmount = 0;


            items.forEach(item => {

                totalAmount += 
                    Number(item.quantity) * 
                    Number(item.unitPrice);

            });



            // Create Purchase

            const newPurchase = await tx.purchase.create({

                data: {

                    supplierId: Number(supplierId),

                    invoiceNumber,

                    totalAmount,

                    status: "RECEIVED"

                }

            });



            // Create Purchase Items + Update Stock

            for (const item of items) {


                const product = await tx.product.findUnique({

                    where: {
                        id: Number(item.productId)
                    }

                });


                if (!product) {

                    throw new Error(
                        `Product ${item.productId} not found`
                    );

                }



                await tx.purchaseItem.create({

                    data: {

                        purchaseId: newPurchase.id,

                        productId: Number(item.productId),

                        quantity: Number(item.quantity),

                        unitPrice: Number(item.unitPrice),

                        totalPrice:
                            Number(item.quantity) *
                            Number(item.unitPrice)

                    }

                });



                // Increase Product Stock

                await tx.product.update({

                    where: {

                        id: Number(item.productId)

                    },

                    data: {

                        stock: {

                            increment:
                                Number(item.quantity)

                        }

                    }

                });



                // Inventory History

                await tx.inventoryTransaction.create({

                    data: {

                        productId:
                            Number(item.productId),

                        type: "STOCK_IN",

                        quantity:
                            Number(item.quantity),

                        remarks:
                            `Purchase Invoice ${invoiceNumber}`

                    }

                });


            }



            return newPurchase;


        });



        res.status(201).json({

            success: true,

            message: "Purchase created successfully",

            purchase

        });



    }
    catch(error){

        console.error(error);


        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};




// ======================================
// GET ALL PURCHASES
// ======================================

exports.getAllPurchases = async (req,res)=>{

    try{


        const purchases = await prisma.purchase.findMany({

            include:{

                supplier:true,

                items:{

                    include:{

                        product:true

                    }

                }

            },


            orderBy:{

                createdAt:"desc"

            }


        });



        res.status(200).json({

            success:true,

            count:purchases.length,

            purchases

        });


    }
    catch(error){


        console.error(error);


        res.status(500).json({

            success:false,

            message:"Internal Server Error"

        });


    }

};




// ======================================
// GET PURCHASE BY ID
// ======================================

exports.getPurchaseById = async(req,res)=>{

    try{


        const purchase = await prisma.purchase.findUnique({

            where:{

                id:Number(req.params.id)

            },


            include:{

                supplier:true,


                items:{

                    include:{

                        product:true

                    }

                }

            }


        });



        if(!purchase){

            return res.status(404).json({

                success:false,

                message:"Purchase not found"

            });

        }



        res.status(200).json({

            success:true,

            purchase

        });



    }
    catch(error){


        console.error(error);


        res.status(500).json({

            success:false,

            message:"Internal Server Error"

        });


    }

};




// ======================================
// UPDATE PURCHASE STATUS
// ======================================

exports.updatePurchaseStatus = async(req,res)=>{

    try{


        const {status}=req.body;



        const purchase = await prisma.purchase.update({

            where:{

                id:Number(req.params.id)

            },


            data:{

                status

            }


        });



        res.status(200).json({

            success:true,

            message:"Purchase status updated successfully",

            purchase

        });


    }
    catch(error){


        console.error(error);


        res.status(500).json({

            success:false,

            message:"Internal Server Error"

        });


    }

};




// ======================================
// DELETE PURCHASE
// ======================================

exports.deletePurchase = async(req,res)=>{

    try{


        const purchase = await prisma.purchase.findUnique({

            where:{

                id:Number(req.params.id)

            },

            include:{

                items:true

            }

        });



        if(!purchase){

            return res.status(404).json({

                success:false,

                message:"Purchase not found"

            });

        }



        await prisma.$transaction(async(tx)=>{


            // Reduce stock before deleting purchase

            for(const item of purchase.items){


                await tx.product.update({

                    where:{

                        id:item.productId

                    },


                    data:{

                        stock:{

                            decrement:item.quantity

                        }

                    }

                });


                await tx.inventoryTransaction.create({

                    data:{

                        productId:item.productId,

                        type:"ADJUSTMENT",

                        quantity:item.quantity,

                        remarks:
                        `Purchase ${purchase.invoiceNumber} deleted`

                    }

                });


            }



            await tx.purchase.delete({

                where:{

                    id:Number(req.params.id)

                }

            });


        });



        res.status(200).json({

            success:true,

            message:"Purchase deleted successfully"

        });



    }
    catch(error){


        console.error(error);


        res.status(500).json({

            success:false,

            message:"Internal Server Error"

        });


    }

};