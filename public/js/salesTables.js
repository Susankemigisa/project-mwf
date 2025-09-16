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
// Select sales table body
const salesTableBody = document.querySelector("#salesTable tbody");

// Load saved sales from localStorage
let salesData = JSON.parse(localStorage.getItem("salesData")) || [];

// Render sales table
function renderSalesTable() {
  salesTableBody.innerHTML = "";
  salesData.forEach((sale) => {
    const row = `
      <tr>
        <td>${sale.customerName}</td>
        <td>${sale.productName}</td>
        <td>${sale.quantity}</td>
        <td>${sale.price}</td>
        <td>${sale.total}</td>
        <td>${sale.date}</td>
        <td>${sale.paymentType}</td>
        <td>${sale.salesAgent}</td>
        <td>${sale.transportIncluded}</td>
      </tr>
    `;
    salesTableBody.innerHTML += row;
  });
}

// Run when page loads
renderSalesTable();
