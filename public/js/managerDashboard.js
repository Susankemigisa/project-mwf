// managerDashboard.js
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// if (!currentUser || currentUser.role !== "Manager") {
//   Swal.fire({
//     icon: 'error',
//     title: 'Access Denied',
//     text: 'Accesed only by the Manager.',
//     confirmButtonText: 'Go back to Sales'
//   }).then(() => {
//     window.location.href = "/html/sales.html";
//   });
// }
(function(){
  const logoutBtn = document.getElementById('logoutBtn');
  if (!logoutBtn) return;

 logoutBtn.addEventListener('click', () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      text: "You will be signed out of the system.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log me out',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#6b46c1',  // your purple
      cancelButtonColor: '#a0aec0',   // grey cancel
      background: '#f8f4ff',          // popup background
      color: '#250753',                // text color
      width: 350,
      padding: '1.5rem',
      buttonsStyling: true,
      customClass: {
        title: 'swal-title',
        popup: 'swal-popup',
        confirmButton: 'swal-confirm',
        cancelButton: 'swal-cancel'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear session/localStorage
        const keysToRemove = ['currentUser']; // add more if needed
        keysToRemove.forEach(k => localStorage.removeItem(k));

        // Optional: show a quick logged-out message
        Swal.fire({
          title: 'Logged out!',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        }).then(() => {
          // Redirect to login page
          window.location.href = 'login';
        });
      }
    });
  });
})();

// Load data
let salesData = JSON.parse(localStorage.getItem("salesData")) || [];
let stockData = JSON.parse(localStorage.getItem("stockData")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];

// ---------- TOP KPIs ----------
let totalRevenue = salesData.reduce((sum, s) => sum + Number(s.total || 0), 0);
let totalOrders = salesData.length;
let avgOrder = totalOrders ? (totalRevenue / totalOrders).toFixed(2) : 0;
let totalStockItems = stockData.length;
let totalProducts = products.length;

document.getElementById("topKPIs").innerHTML = `
  <div class="kpi-card">💰 Revenue: UGX ${totalRevenue.toLocaleString()}</div>
  <div class="kpi-card">📦 Orders: ${totalOrders}</div>
  <div class="kpi-card">📊 AOV: UGX ${avgOrder}</div>
  <div class="kpi-card">🏷️ Stock Items: ${totalStockItems}</div>
 <div class="kpi-card">🛒 Products: ${totalProducts}</div>
`;

// ---------- Revenue Over Time ----------
let revenueByDate = {};
salesData.forEach(s => {
  revenueByDate[s.date] = (revenueByDate[s.date] || 0) + Number(s.total || 0);
});

new Chart(document.getElementById("revenueChart"), {
  type: "line",
  data: {
    labels: Object.keys(revenueByDate),
    datasets: [{
      label: "Revenue (UGX)",
      data: Object.values(revenueByDate),
      borderColor: "blue",
      backgroundColor: "rgba(0,0,255,0.1)"
    }]
  }
});

// ---------- Most Sold Items ----------
let itemsMap = {};
salesData.forEach(s => {
  itemsMap[s.productName] = (itemsMap[s.productName] || 0) + Number(s.quantity || 0);
});

new Chart(document.getElementById("topItemsChart"), {
  type: "bar",
  data: {
    labels: Object.keys(itemsMap),
    datasets: [{
      label: "Units Sold",
      data: Object.values(itemsMap),
      backgroundColor: "orange"
    }]
  }
});

// ---------- Sales by Attendant ----------
let agentMap = {};
salesData.forEach(s => {
  agentMap[s.salesAgent] = (agentMap[s.salesAgent] || 0) + Number(s.total || 0);
});

new Chart(document.getElementById("attendantChart"), {
  type: "pie",
  data: {
    labels: Object.keys(agentMap),
    datasets: [{
      data: Object.values(agentMap),
      backgroundColor: ["#36a2eb","#ff6384","#4bc0c0","#9966ff","#ff9f40"]
    }]
  }
});

// ---------- Payment Methods ----------
let paymentMap = {};
salesData.forEach(s => {
  paymentMap[s.paymentType] = (paymentMap[s.paymentType] || 0) + 1;
});

new Chart(document.getElementById("paymentChart"), {
  type: "doughnut",
  data: {
    labels: Object.keys(paymentMap),
    datasets: [{
      data: Object.values(paymentMap),
      backgroundColor: ["#28a745", "#ffc107", "#dc3545"]
    }]
  }
});

// ---------- Transport Usage ----------
let transportYes = salesData.filter(s => s.transportIncluded === "Yes").length;
let transportNo = totalOrders - transportYes;

new Chart(document.getElementById("transportChart"), {
  type: "doughnut",
  data: {
    labels: ["With Transport", "Without Transport"],
    datasets: [{
      data: [transportYes, transportNo],
      backgroundColor: ["#17a2b8","#6c757d"]
    }]
  }
});

// ---------- Available Products Table ----------
let availableProductsBody = document.querySelector("#availableProducts tbody");

if (availableProductsBody) {
  stockData.forEach(item => {
    let row = `
      <tr>
        <td>${item.productName}</td>
        <td>${item.quantity}</td>
      </tr>
    `;
    availableProductsBody.innerHTML += row;
  });
}


// ---------- Inventory Stock Levels ----------
let stockLevels = {};
stockData.forEach(s => {
  stockLevels[s.productName] = Number(s.quantity || 0);
});

new Chart(document.getElementById("inventoryChart"), {
  type: "bar",
  data: {
    labels: Object.keys(stockLevels),
    datasets: [{
      label: "Stock Quantity",
      data: Object.values(stockLevels),
      backgroundColor: "teal"
    }]
  }
});

// ---------- Low Stock Items ----------
let lowStock = stockData.filter(s => Number(s.quantity) <= 5);

new Chart(document.getElementById("lowStockChart"), {
  type: "bar",
  data: {
    labels: lowStock.map(s => s.productName),
    datasets: [{
      label: "Low Stock (≤5)",
      data: lowStock.map(s => Number(s.quantity)),
      backgroundColor: "red"
    }]
  }
});

// ---------- Latest Orders Table ----------
let latestOrdersBody = document.querySelector("#latestOrders tbody");
salesData.slice(-5).reverse().forEach(s => {
  let row = `
    <tr>
      <td>${s.productName}</td>
      <td>${s.date}</td>
      <td>${s.customerName}</td>
      <td>${s.transportIncluded === "Yes" ? "With Transport" : "Normal"}</td>
      <td>UGX ${Number(s.total).toLocaleString()}</td>
    </tr>
  `;
  latestOrdersBody.innerHTML += row;
});
