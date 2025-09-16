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
// Handle form submission
const stockForm = document.getElementById("stockForm");

if (stockForm) {
  stockForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect form data
    const stockItem = {
      productName: document.getElementById("productName").value,
      productType: document.getElementById("productType").value,
      supplierName: document.getElementById("supplierName").value,
      date: document.getElementById("date").value,
      quantity: document.getElementById("quantity").value,
      costPrice: document.getElementById("costPrice").value,
      sellingPrice: document.getElementById("sellingPrice").value,
      quality: document.getElementById("quality").value,
      color: document.getElementById("color").value,
      measurements: document.getElementById("measurements").value,
    };

    // Get existing stock from localStorage
    let stockData = JSON.parse(localStorage.getItem("stockData")) || [];

    // Add new stock item
    stockData.push(stockItem);

    // Save back to localStorage
    localStorage.setItem("stockData", JSON.stringify(stockData));

    // Clear form
    stockForm.reset();

    // Redirect to stock-list.html after saving
    window.location.href = "stocklist";
  });
}
