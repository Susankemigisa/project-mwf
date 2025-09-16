// Handle sales form submission
const salesForm = document.getElementById("salesForm");

if (salesForm) {
  salesForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const quantity = parseInt(document.getElementById("quantity").value);
    const unitPrice = parseFloat(document.getElementById("price").value);
    const transportChecked = document.getElementById("transport").checked;

    // Base total
    let total = unitPrice * quantity;

    // Add 5% transport if selected
    let transportFee = 0;
    if (transportChecked) {
      transportFee = total * 0.05;
      total += transportFee;
    }

    const sale = {
      customerName: document.getElementById("customerName").value,
      productName: document.getElementById("productName").value,
      quantity: quantity,
      price: unitPrice,
      total: total.toFixed(2),
      date: document.getElementById("date").value,
      paymentType: document.getElementById("paymentType").value,
      salesAgent: document.getElementById("salesAgent").value,
      transportIncluded: transportChecked ? "Yes" : "No",
    };

    // Get sales from localStorage
    let salesData = JSON.parse(localStorage.getItem("salesData")) || [];

    // Add new sale
    salesData.push(sale);

    // Save back to localStorage
    localStorage.setItem("salesData", JSON.stringify(salesData));

    // --- Print receipt ---
    printReceipt(sale);

    // Clear form
    salesForm.reset();

    // Redirect to sales list after printing
    setTimeout(() => {
      window.location.href = "salesTable";
    }, 500); // slight delay so print dialog can appear
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


// Function to print the receipt
function printReceipt(sale) {
  const receiptWindow = window.open("", "Print Receipt", "width=400,height=600");
  receiptWindow.document.write(`
    <html>
    <head>
      <title>Receipt</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h2 { text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        td, th { border: 1px solid #333; padding: 8px; text-align: left; }
        .total { font-weight: bold; }
      </style>
    </head>
    <body>
      <h2>Sales Receipt</h2>
      <p><strong>Date:</strong> ${sale.date}</p>
      <p><strong>Customer:</strong> ${sale.customerName}</p>
      <p><strong>Sales Agent:</strong> ${sale.salesAgent}</p>
      <table>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Unit Price</th>
          <th>Total</th>
        </tr>
        <tr>
          <td>${sale.productName}</td>
          <td>${sale.quantity}</td>
          <td>${sale.price.toFixed(2)}</td>
          <td>${sale.total}</td>
        </tr>
        <tr>
          <td colspan="3">Transport Included</td>
          <td>${sale.transportIncluded}</td>
        </tr>
      </table>
      <p class="total">Grand Total: $${sale.total}</p>
      <p style="text-align:center; margin-top:30px;">Thank you for your purchase!</p>
    </body>
    </html>
  `);
  receiptWindow.document.close();
  receiptWindow.focus();
  receiptWindow.print();
}
