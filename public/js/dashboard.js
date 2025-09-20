// managerDashboard.js

// ========== LOGOUT ==========
(function () {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      text: "You will be signed out of the system.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#6b46c1",
      cancelButtonColor: "#a0aec0",
      background: "#f8f4ff",
      color: "#250753",
      width: 350,
      padding: "1.5rem",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged out!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/login";
        });
      }
    });
  });
})();

// ========== CHART DATA ==========
// These variables must come from your route → Pug → frontend
// Example: res.render("managerDashboard", { revenueByDate, itemsMap, agentMap, ... })
const revenueByDate = window.revenueByDate || {};
const itemsMap = window.itemsMap || {};
const agentMap = window.agentMap || {};
const paymentMap = window.paymentMap || {};
const transportStats = window.transportStats || { yes: 0, no: 0 };
const stockLevels = window.stockLevels || {};
const lowStock = window.lowStock || [];
const latestOrders = window.latestOrders || [];

// ========== REVENUE OVER TIME ==========
new Chart(document.getElementById("revenueChart"), {
  type: "line",
  data: {
    labels: Object.keys(revenueByDate),
    datasets: [
      {
        label: "Revenue (UGX)",
        data: Object.values(revenueByDate),
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.1)",
      },
    ],
  },
});

// ========== MOST SOLD ITEMS ==========
new Chart(document.getElementById("topItemsChart"), {
  type: "bar",
  data: {
    labels: Object.keys(itemsMap),
    datasets: [
      {
        label: "Units Sold",
        data: Object.values(itemsMap),
        backgroundColor: "orange",
      },
    ],
  },
});

// ========== SALES BY ATTENDANT ==========
new Chart(document.getElementById("attendantChart"), {
  type: "pie",
  data: {
    labels: Object.keys(agentMap),
    datasets: [
      {
        data: Object.values(agentMap),
        backgroundColor: ["#36a2eb", "#ff6384", "#4bc0c0", "#9966ff", "#ff9f40"],
      },
    ],
  },
});

// ========== PAYMENT METHODS ==========
new Chart(document.getElementById("paymentChart"), {
  type: "doughnut",
  data: {
    labels: Object.keys(paymentMap),
    datasets: [
      {
        data: Object.values(paymentMap),
        backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
      },
    ],
  },
});

// ========== TRANSPORT USAGE ==========
new Chart(document.getElementById("transportChart"), {
  type: "doughnut",
  data: {
    labels: ["Included", "Not Included"],
    datasets: [
      {
        data: [transportStats.yes, transportStats.no],
        backgroundColor: ["#17a2b8", "#6c757d"],
      },
    ],
  },
});

// ========== INVENTORY STOCK LEVELS ==========
new Chart(document.getElementById("inventoryChart"), {
  type: "bar",
  data: {
    labels: Object.keys(stockLevels),
    datasets: [
      {
        label: "Stock Quantity",
        data: Object.values(stockLevels),
        backgroundColor: "teal",
      },
    ],
  },
});

// ========== LOW STOCK ITEMS ==========
new Chart(document.getElementById("lowStockChart"), {
  type: "bar",
  data: {
    labels: lowStock.map((s) => s.productName),
    datasets: [
      {
        label: "Low Stock (≤5)",
        data: lowStock.map((s) => s.quantity),
        backgroundColor: "red",
      },
    ],
  },
});
