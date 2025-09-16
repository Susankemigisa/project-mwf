const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "Manager") {
  Swal.fire({
    icon: 'error',
    title: 'Access Denied',
    text: 'Accesed only by the Manager.',
    confirmButtonText: 'Go back to Sales'
  }).then(() => {
    window.location.href = "/html/sales.html";
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
          window.location.href = 'login.html';
        });
      }
    });
  });
})();

function renderUsers() {
  const rolesDiv = document.getElementById("roles");
  rolesDiv.innerHTML = users.map((u, i) => `
    <div class="role-row">
      <input type="text" value="${u.name}" onchange="updateUser(${i}, 'name', this.value)">
      <select onchange="updateUser(${i}, 'role', this.value)">
        <option value="Admin" ${u.role==='Admin'?'selected':''}>Admin</option>
        <option value="Staff" ${u.role==='Staff'?'selected':''}>Staff</option>
      </select>
      <button class="danger" onclick="deleteUser(${i})">Delete</button>
    </div>
  `).join("");
}

function updateUser(index, field, value) {
  users[index][field] = value;
  renderUsers(); // ✅ refresh UI
}

function addUser() {
  users.push({ name: "New User", role: "Staff" });
  renderUsers();
}

function deleteUser(index) {
  users.splice(index, 1);
  renderUsers();
}

function saveSettings() {
  const settings = {
    companyName: document.getElementById("companyName").value,
    currency: document.getElementById("currency").value,
    reportFreq: document.getElementById("reportFreq").value,
    transportFee: parseFloat(document.getElementById("transportFee").value) || 0,
    paymentMethods: Array.from(document.getElementById("paymentMethods").selectedOptions).map(o => o.value),
    qualityLevels: document.getElementById("qualityLevels").value.split(',').map(s => s.trim()),
    optionalFields: Array.from(document.getElementById("optionalFields").selectedOptions).map(o => o.value),
    users: users,
  };
  localStorage.setItem("mwfSettings", JSON.stringify(settings));
  alert("✅ Settings saved!");
}

function loadSettings() {
  const data = localStorage.getItem("mwfSettings");
  if (data) {
    const s = JSON.parse(data);
    document.getElementById("companyName").value = s.companyName || "";
    document.getElementById("currency").value = s.currency || "";
    document.getElementById("reportFreq").value = s.reportFreq || "";
    document.getElementById("transportFee").value = s.transportFee || 0;

    // payment methods
    const pm = document.getElementById("paymentMethods");
    Array.from(pm.options).forEach(opt => opt.selected = s.paymentMethods?.includes(opt.value));

    document.getElementById("qualityLevels").value = (s.qualityLevels || []).join(", ");

    const of = document.getElementById("optionalFields");
    Array.from(of.options).forEach(opt => opt.selected = s.optionalFields?.includes(opt.value));

    users = s.users || [];
  }
  renderUsers();
}

function exportData() {
  const data = JSON.stringify(JSON.parse(localStorage.getItem("mwfSettings") || "{}"), null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'mwf-settings.json'; a.click();
  URL.revokeObjectURL(url);
}

document.getElementById("importFile").addEventListener("change", function(e){
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const parsed = JSON.parse(evt.target.result);
      localStorage.setItem("mwfSettings", JSON.stringify(parsed));
      loadSettings();
      alert("✅ Settings imported!");
    } catch(err){ alert("❌ Invalid settings file"); }
  }
  reader.readAsText(file);
});

function resetSettings() {
  if(confirm("Reset all settings to defaults?")) {
    localStorage.removeItem("mwfSettings");
    location.reload();
  }
}

// Run on page load
window.onload = loadSettings;
