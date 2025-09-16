// managerReports.js
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

// --- KPIs ---
let totalOrders = salesData.length;
let totalRevenue = salesData.reduce((sum, s) => sum + Number(s.total || 0), 0);
let aov = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;
let salesWithTransport = salesData.filter(s => s.transportIncluded === "Yes").length;
let transportPercent = totalOrders > 0 ? ((salesWithTransport / totalOrders) * 100).toFixed(1) : 0;

// --- Top product ---
let productMap = {};
salesData.forEach(s => {
  productMap[s.productName] = (productMap[s.productName] || 0) + Number(s.total || 0);
});
let topProduct = Object.entries(productMap).sort((a,b) => b[1]-a[1])[0]?.[0] || "N/A";

// --- Top agent ---
let agentMap = {};
salesData.forEach(s => {
  agentMap[s.salesAgent] = (agentMap[s.salesAgent] || 0) + Number(s.total || 0);
});
let topAgent = Object.entries(agentMap).sort((a,b) => b[1]-a[1])[0]?.[0] || "N/A";

// --- Top category (wood vs furniture from stock) ---
let categoryMap = {Wood: 0, Furniture: 0};
salesData.forEach(s => {
  let match = stockData.find(st => st.productName === s.productName);
  if (match) {
    categoryMap[match.productType] += Number(s.total || 0);
  }
});
let topCategory = categoryMap.Wood >= categoryMap.Furniture ? "Wood" : "Furniture";

// --- Stockouts ---
let stockouts = stockData.filter(st => Number(st.quantity) <= 0).map(st => st.productName);
let stockoutText = stockouts.length > 0 ? stockouts.join(", ") : "none";

// --- Fill placeholders ---
document.getElementById("reportMonth").textContent = new Date().toLocaleString("default", {month: "long", year:"numeric"});
document.getElementById("reportDate").textContent = new Date().toDateString();
document.getElementById("totalRevenue").textContent = totalRevenue.toLocaleString();
document.getElementById("totalOrders").textContent = totalOrders;
document.getElementById("aov").textContent = aov.toFixed(2);
document.getElementById("transportUsage").textContent = transportPercent + "%";
document.getElementById("transportPercent").textContent = transportPercent + "%";
document.getElementById("topProduct").textContent = topProduct;
document.getElementById("topAgent").textContent = topAgent;
document.getElementById("topCategory").textContent = topCategory;
document.getElementById("stockouts").textContent = stockoutText;
