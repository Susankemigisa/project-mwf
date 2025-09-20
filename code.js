// // --- SALES KPIs --- 
// let totalRevenueAgg = await SalesModel.aggregate([ 
//   { $group: { _id: null, totalRevenue: 
//     { $sum: "$total" } } } ]); 
//     let totalRevenue = totalRevenueAgg[0]?.totalRevenue || 0; 
//     let totalOrdersAgg = await SalesModel.aggregate([ { $group: 
//       { _id: null, totalOrders: { $sum: 1 } } } ]); 
//     let totalOrders = totalOrdersAgg[0]?.totalOrders || 0; 
//     let avgOrder = totalOrders ? (totalRevenue / totalOrders).toFixed(2) : 0;

//   // --- STOCK & PRODUCTS KPIs ---
//   let totalStockAgg = await StockModel.aggregate([
//     { $group: { _id: null, totalStockItems: { $sum: 1 } } }
//   ]);
//   let totalStockItems = totalStockAgg[0]?.totalStockItems || 0;

//   let totalProductsAgg = await ProductsModel.aggregate([
//     { $group: { _id: null, totalProducts: { $sum: 1 } } }
//   ]);
//   let totalProducts = totalProductsAgg[0]?.totalProducts || 0;
//   // --- CHART DATA ---
// const salesData = await SalesModel.find({});

// Most Sold Items
// let itemsMap = {};
// salesData.forEach(s => {
//   itemsMap[s.productName] = (itemsMap[s.productName] || 0) + Number(s.quantity);
// });

// Sales by Attendant
// this code aggregates total sales per sales agent into an object.
// let agentMap = {};
// salesData.forEach(s => {
//   agentMap[s.salesAgent] = (agentMap[s.salesAgent] || 0) + Number(s.total);
// });

// // Payment Methods
// let paymentMap = {};
// salesData.forEach(s => {
//   paymentMap[s.paymentType] = (paymentMap[s.paymentType] || 0) + 1;
// });

// // Transport Usage
// const transportStats = {
//   yes: salesData.filter(s => s.transportIncluded === "Included").length,
//   no: salesData.filter(s => s.transportIncluded !== "Not Included").length
// };

// // Stock Levels
// const stockData = await StockModel.find({});
// let stockLevels = {};
// stockData.forEach(s => stockLevels[s.productName] = Number(s.quantity));

// // Low Stock
// const lowStock = stockData.filter(s => Number(s.quantity) <= 5);

// // Latest Orders
// const latestOrders = salesData.slice(-5).reverse();



    // totalRevenue,
    // totalOrders,
    // avgOrder,
    // totalStockItems,
    // totalProducts,
        // itemsMap,
    // agentMap,
    // paymentMap,
    // transportStats,
    // stockLevels,
    // lowStock,
    // latestOrders,



