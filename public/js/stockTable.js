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
          window.location.href = 'login.html';
        });
      }
    });
  });
})();

// Select stock table body
const stockTableBody = document.querySelector("#stockTable tbody");

// Load saved stock from localStorage
let stockData = JSON.parse(localStorage.getItem("stockData")) || [];

// Render stock table
function renderTable() {
stockTableBody.innerHTML = "";

stockData.forEach((item) => {
  const row = `
    <tr>
      <td>${item.productName}</td>
      <td>${item.productType}</td>
      <td>${item.supplierName}</td>
      <td>${item.date}</td>
      <td>${item.quantity}</td>
      <td>${item.costPrice}</td>
      <td>${item.sellingPrice}</td>
      <td>${item.quality}</td>
      <td>${item.color}</td>
      <td>${item.measurements}</td>
      <td>
        <a href="/editstock/${item._id}" class="btn btn-warning">Edit</a>
      </td>
    </tr>
  `;
  stockTableBody.innerHTML += row;
});

  // Build Stock Levels Chart
  let stockLevels = {};
  stockData.forEach(s => {
    stockLevels[s.productName] = Number(s.quantity || 0);
  });

  new Chart(document.getElementById("stockLevelsChart"), {
    type: "bar",
    data: {
      labels: Object.keys(stockLevels),
      datasets: [{
        label: "Quantity",
        data: Object.values(stockLevels),
        backgroundColor: "rgba(54,162,235,0.6)",
        borderColor: "rgba(54,162,235,1)",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // Build Low Stock Chart (≤5)
  let lowStock = stockData.filter(s => Number(s.quantity) <= 5);

  new Chart(document.getElementById("lowStockChart"), {
    type: "bar",
    data: {
      labels: lowStock.map(s => s.productName),
      datasets: [{
        label: "Low Stock Qty",
        data: lowStock.map(s => Number(s.quantity)),
        backgroundColor: "rgba(255,99,132,0.6)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// Run on page load
renderTable();
