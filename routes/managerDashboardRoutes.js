const express = require("express");
const router = express.Router();
const StockModel = require("../models/stockModel")


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
    // to avoid crushing if no expenses have been incured
    //set default values if no expenses in the DB
    totalExpenseTimber = totalExpenseTimber[0] ??{totalQuantity:0, totalCost:0}
    totalExpenseHardwood = totalExpenseHardwood[0] ??{totalQuantity:0, totalCost:0}
    totalExpenseSoftwood = totalExpenseSoftwood[0] ??{totalQuantity:0, totalCost:0}
    totalExpensePoles = totalExpensePoles[0] ??{totalQuantity:0, totalCost:0}
    totalExpenseChairs = totalExpenseChairs[0] ??{totalQuantity:0, totalCost:0}
    totalExpenseTables = totalExpenseTables[0] ??{totalQuantity:0, totalCost:0}
    res.render("managerDashboard", {
    totalExpenseTimber,
    totalExpenseHardwood,
    totalExpenseSoftwood,
    totalExpensePoles,
    totalExpenseChairs,
    totalExpenseTables,
      title:"Dashboard"});
  } catch (error) {
    res.status(400).send("Unable to find items")
    console.error("Aggregation error:", error.message)
  }
});

router.post("/dashboard",(req, res) =>{
  console.log(req.body);
});



module.exports = router;

