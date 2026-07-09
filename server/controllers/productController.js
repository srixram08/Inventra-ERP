const prisma = require("../config/prisma");


// ======================================
// CREATE PRODUCT
// ======================================

exports.createProduct = async (req, res) => {

  try {


    const {
      name,
      sku,
      price,
      stock,
      categoryId,
      supplierId
    } = req.body;



    const product =
      await prisma.product.create({

        data:{

          name,

          sku,

          price:Number(price),

          stock:Number(stock),

          categoryId:Number(categoryId),

          supplierId:Number(supplierId)

        },

        include:{

          category:true,

          supplier:true

        }

      });



    res.status(201).json({

      success:true,

      message:"Product Created Successfully",

      data:product

    });



  }

  catch(error){

    console.log(error);


    res.status(500).json({

      success:false,

      message:"Product creation failed",

      error:error.message

    });


  }

};





// ======================================
// GET ALL PRODUCTS
// ======================================

exports.getProducts = async(req,res)=>{

  try{


    const products =

      await prisma.product.findMany({

        include:{

          category:true,

          supplier:true

        },

        orderBy:{

          id:"desc"

        }

      });




    res.json({

      success:true,

      data:products

    });



  }

  catch(error){


    console.log(error);


    res.status(500).json({

      success:false,

      message:"Failed to fetch products",

      error:error.message

    });


  }


};





// ======================================
// GET SINGLE PRODUCT
// ======================================

exports.getProductById = async(req,res)=>{


  try{


    const product =

      await prisma.product.findUnique({

        where:{

          id:Number(req.params.id)

        },

        include:{

          category:true,

          supplier:true

        }

      });




    if(!product){

      return res.status(404).json({

        success:false,

        message:"Product not found"

      });

    }



    res.json({

      success:true,

      data:product

    });



  }

  catch(error){


    res.status(500).json({

      success:false,

      message:"Error fetching product",

      error:error.message

    });


  }


};






// ======================================
// UPDATE PRODUCT
// ======================================

exports.updateProduct = async(req,res)=>{


  try{


    const id =
      Number(req.params.id);



    const {

      name,

      sku,

      price,

      stock,

      categoryId,

      supplierId


    } = req.body;




    const product =

      await prisma.product.update({

        where:{

          id

        },


        data:{


          name,


          sku,


          price:Number(price),


          stock:Number(stock),


          categoryId:Number(categoryId),


          supplierId:Number(supplierId)


        },


        include:{

          category:true,

          supplier:true

        }


      });





    res.json({

      success:true,

      message:"Product Updated Successfully",

      data:product

    });



  }

  catch(error){


    console.log(error);



    res.status(500).json({

      success:false,

      message:"Product update failed",

      error:error.message

    });


  }


};






// ======================================
// DELETE PRODUCT
// ======================================

exports.deleteProduct = async(req,res)=>{


  try{


    const id =
      Number(req.params.id);



    await prisma.product.delete({

      where:{

        id

      }

    });




    res.json({

      success:true,

      message:"Product Deleted Successfully"

    });



  }

  catch(error){


    console.log(error);



    res.status(500).json({

      success:false,

      message:"Product delete failed",

      error:error.message

    });


  }


};