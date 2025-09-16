// products.js
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

const productForm = document.getElementById("productForm");

if (productForm) {
  productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const product = {
      name: document.getElementById("productName").value,
      category: document.getElementById("productCategory").value,
      price: parseFloat(document.getElementById("unitPrice").value),
       quantity: parseFloat(document.getElementById("quantity").value),
    };

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    productForm.reset();
    alert("✅ Product registered successfully!");
  });
}
