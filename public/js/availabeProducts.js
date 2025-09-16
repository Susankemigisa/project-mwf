const productTableBody = document.querySelector("#productTable tbody");

let products = JSON.parse(localStorage.getItem("products")) || [];

if (productTableBody) {
  products.forEach((product) => {
    let row = `
      <tr>
        <td>${product.productName}</td>
        <td>${product.category}</td>
        <td>UGX ${Number(product.price).toLocaleString()}</td>
        <td>UGX ${Number(product.quantity).toLocaleString()}</td>
      </tr>
    `;
    productTableBody.innerHTML += row;
  });
}
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