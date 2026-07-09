const prisma = require("../config/prisma");

// ======================================
// Dashboard Summary
// ======================================

exports.getDashboardSummary = async (req, res) => {
  try {
    const [
      totalProducts,
      totalCustomers,
      totalSuppliers,
      totalSales,
      totalPurchases,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.customer.count(),
      prisma.supplier.count(),
      prisma.sale.aggregate({
        _sum: {
          totalAmount: true,
        },
      }),
      prisma.purchase.aggregate({
        _sum: {
          totalAmount: true,
        },
      }),
    ]);

    const sales = totalSales._sum.totalAmount || 0;
    const purchases = totalPurchases._sum.totalAmount || 0;

    const profit = Math.max(sales - purchases, 0);

    res.json({
      success: true,
      data: {
        totalProducts,
        totalCustomers,
        totalSuppliers,
        totalSales: sales,
        totalPurchases: purchases,
        profit,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success:false,
      message:"Failed to fetch dashboard summary",
    });
  }
};


// ======================================
// Revenue Analytics
// ======================================

exports.getRevenueAnalytics = async (req,res)=>{
  try {

    const now = new Date();

    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const weekStart = new Date();
    weekStart.setDate(now.getDate()-7);


    const monthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );


    const yearStart = new Date(
      now.getFullYear(),
      0,
      1
    );


    const [
      todayRevenue,
      weekRevenue,
      monthRevenue,
      yearRevenue
    ] = await Promise.all([

      prisma.sale.aggregate({
        _sum:{
          totalAmount:true
        },
        where:{
          createdAt:{
            gte:todayStart
          }
        }
      }),


      prisma.sale.aggregate({
        _sum:{
          totalAmount:true
        },
        where:{
          createdAt:{
            gte:weekStart
          }
        }
      }),


      prisma.sale.aggregate({
        _sum:{
          totalAmount:true
        },
        where:{
          createdAt:{
            gte:monthStart
          }
        }
      }),


      prisma.sale.aggregate({
        _sum:{
          totalAmount:true
        },
        where:{
          createdAt:{
            gte:yearStart
          }
        }
      })

    ]);


    res.json({
      success:true,
      data:{
        today:todayRevenue._sum.totalAmount || 0,
        week:weekRevenue._sum.totalAmount || 0,
        month:monthRevenue._sum.totalAmount || 0,
        year:yearRevenue._sum.totalAmount || 0,
      }
    });


  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Failed to fetch revenue analytics"
    });

  }
};



// ======================================
// Sales Chart
// ======================================

exports.getSalesChart = async(req,res)=>{

 try{

  const sales = await prisma.sale.findMany({

    select:{
      createdAt:true,
      totalAmount:true
    },

    orderBy:{
      createdAt:"asc"
    }

  });


  const monthlySales={};


  sales.forEach((sale)=>{

    const month =
    sale.createdAt.toLocaleString(
      "default",
      {
        month:"short"
      }
    );


    monthlySales[month] =
    (monthlySales[month] || 0)
    + Number(sale.totalAmount);


  });



  const result =
  Object.keys(monthlySales).map(month=>({

    month,
    sales:monthlySales[month]

  }));



  res.json({
    success:true,
    data:result
  });



 }catch(error){

  console.error(error);

  res.status(500).json({
    success:false,
    message:"Failed to fetch sales chart"
  });

 }

};



// ======================================
// Purchase Chart
// ======================================

exports.getPurchaseChart = async(req,res)=>{

try{


const purchases = await prisma.purchase.findMany({

select:{
 createdAt:true,
 totalAmount:true
},

orderBy:{
 createdAt:"asc"
}

});


const monthlyPurchases={};


purchases.forEach((purchase)=>{


const month =
purchase.createdAt.toLocaleString(
"default",
{
month:"short"
}
);


monthlyPurchases[month] =
(monthlyPurchases[month] || 0)
+ Number(purchase.totalAmount);


});



const result =
Object.keys(monthlyPurchases)
.map(month=>({

month,
purchases:monthlyPurchases[month]

}));



res.json({
success:true,
data:result
});


}catch(error){

console.error(error);

res.status(500).json({
success:false,
message:"Failed to fetch purchase chart"
});

}

};



// ======================================
// Inventory Status
// ======================================

exports.getInventoryStatus = async(req,res)=>{

try{

const inStock =
await prisma.product.count({
where:{
stock:{
gt:10
}
}
});


const lowStock =
await prisma.product.count({
where:{
stock:{
gt:0,
lte:10
}
}
});


const outOfStock =
await prisma.product.count({
where:{
stock:0
}
});


res.json({

success:true,

data:{
inStock,
lowStock,
outOfStock
}

});


}catch(error){

console.error(error);

res.status(500).json({
success:false,
message:"Failed to fetch inventory status"
});

}

};



// ======================================
// Low Stock
// ======================================

exports.getLowStockProducts = async(req,res)=>{

try{

const products =
await prisma.product.findMany({

where:{
stock:{
lte:10
}
},

select:{
id:true,
name:true,
sku:true,
stock:true
},

orderBy:{
stock:"asc"
}

});


res.json({

success:true,
count:products.length,
data:products

});


}catch(error){

console.error(error);

res.status(500).json({
success:false,
message:"Failed to fetch low stock products"
});

}

};



// ======================================
// Recent Sales
// ======================================

exports.getRecentSales = async(req,res)=>{

try{


const sales =
await prisma.sale.findMany({

take:5,

orderBy:{
createdAt:"desc"
},


include:{
customer:{
select:{
id:true,
name:true,
email:true
}
}
}

});


res.json({

success:true,
count:sales.length,
data:sales

});


}catch(error){

console.error(error);

res.status(500).json({
success:false,
message:"Failed to fetch recent sales"
});

}

};



// ======================================
// Recent Purchases
// ======================================

exports.getRecentPurchases = async(req,res)=>{


try{


const purchases =
await prisma.purchase.findMany({

take:5,

orderBy:{
createdAt:"desc"
},


include:{
supplier:{
select:{
id:true,
name:true,
companyName:true
}
}
}

});


res.json({

success:true,
count:purchases.length,
data:purchases

});


}catch(error){

console.error(error);


res.status(500).json({

success:false,

message:"Failed to fetch recent purchases"

});


}

};