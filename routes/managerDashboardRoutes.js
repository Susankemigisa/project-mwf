const express = require("express");
const router = express.Router();
const StockModel = require("../models/stockModel");
const SalesModel = require("../models/salesModel");
const ProductsModel = require("../models/productsModel");


 router.get("/dashboard", async(req, res) =>{
  try {
    //expenses for buying stock
    let totalExpenseTimber= await StockModel.aggregate([
      {$match:{productName: "Timber"}},
      {$group:{_id: "$productType",
        totalQuantity:{$sum: "$quantity"},
        //cost price is unitprice for each item
        totalCost:{$sum:{$multiply:["$quantity","$costPrice"]}}
      }}
    ]);
        let totalExpenseHardwood= await StockModel.aggregate([
      {$match:{productName: "Hardwood"}},
      {$group:{_id: "$productType",
        totalQuantity:{$sum: "$quantity"},
        //cost price is unitprice for each item
        totalCost:{$sum:{$multiply:["$quantity","$costPrice"]}}
      }}
    ]);    
        let totalExpenseSoftwood= await StockModel.aggregate([
      {$match:{productName: "Softwood"}},
      {$group:{_id: "$productType",
        totalQuantity:{$sum: "$quantity"},
        //cost price is unitprice for each item
        totalCost:{$sum:{$multiply:["$quantity","$costPrice"]}}
      }}
    ]);     
       let totalExpensePoles= await StockModel.aggregate([
      {$match:{productName: "Poles"}},
      {$group:{_id: "$productType",
        totalQuantity:{$sum: "$quantity"},
        //cost price is unitprice for each item
        totalCost:{$sum:{$multiply:["$quantity","$costPrice"]}}
      }}
    ]);
            let totalExpenseChairs= await StockModel.aggregate([
      {$match:{productName: "Chairs"}},
      {$group:{_id:"$productType",
        totalQuantity:{$sum: "$quantity"},
        //cost price is unitprice for each item
        totalCost:{$sum:{$multiply:["$quantity","$costPrice"]}}
      }}
    ]);
            let totalExpenseTables= await StockModel.aggregate([
      {$match:{productName: "Tables"}},
      {$group:{_id: "$productType",
        totalQuantity:{$sum: "$quantity"},
        //cost price is unitprice for each item
        totalCost:{$sum:{$multiply:["$quantity","$costPrice"]}}
      }}
    ]);
    //sales revenue
     let totalRevenueTimber= await StockModel.aggregate([
      {$match:{productName: "Timber"}},
      {$group:{_id: "$productType",
        totalQuantity:{$sum: "$quantity"},
        //cost price is unitprice for each item
        totalCost:{$sum:{$multiply:["$quantity","$unitPrice"]}}
      }}
    ]);
    let totalRevenueAgg = await SalesModel.aggregate([
  { $group: { _id: null, totalRevenue: { $sum: "$total" } } }
]);
let totalRevenue = totalRevenueAgg[0]?.totalRevenue || 0;


// Revenue by Date
let revenueByDateAgg = await SalesModel.aggregate([
  {
    // $dateFromString converts the salesmodel string into a real MongoDB Date object.
    $addFields: {
      // The new field dateObj is added to each document.
      dateObj: { $dateFromString: { dateString: "$date" } }
    }
  },
  {
    // Groups sales by date.
    $group: {
      // _id becomes the date string (e.g. "2025-09-17").
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$dateObj" } },
      // totalRevenue is the sum of all total fields for that date.
      totalRevenue: { $sum: "$total" }
    }
  },
  // Sorts results by _id (the date string) in ascending order.
  { $sort: { _id: 1 } }
]);
// Converts the aggregation array into a plain JavaScript object:
let revenueByDate = {};
revenueByDateAgg.forEach(r => revenueByDate[r._id] = r.totalRevenue);

    // to avoid crushing if no expenses have been incured
    //set default values if no expenses in the DB
    totalExpenseTimber = totalExpenseTimber[0] ??{totalQuantity:0, totalCost:0}
    totalExpenseHardwood = totalExpenseHardwood[0] ??{totalQuantity:0, totalCost:0}
    totalExpenseSoftwood = totalExpenseSoftwood[0] ??{totalQuantity:0, totalCost:0}
    totalExpensePoles = totalExpensePoles[0] ??{totalQuantity:0, totalCost:0}
    totalExpenseChairs = totalExpenseChairs[0] ??{totalQuantity:0, totalCost:0}
    totalExpenseTables = totalExpenseTables[0] ??{totalQuantity:0, totalCost:0}
    totalRevenueTimber = totalRevenueTimber[0]??{totalQuantity:0, totalCost:0}
    totalRevenue = totalRevenue[0]||

    res.render("managerDashboard", {
    totalExpenseTimber,
    totalExpenseHardwood,
    totalExpenseSoftwood,
    totalExpensePoles,
    totalExpenseChairs,
    totalExpenseTables,
    totalRevenue,
    revenueByDate,
    totalRevenueTimber,
      title:"Dashboard"});
  } catch (error) {
    res.status(400).send("Unable to find items")
    console.error("Aggregation error:", error.message)
  };
});

router.post("/dashboard",(req, res) =>{
  console.log(req.body);
});


module.exports = router;

