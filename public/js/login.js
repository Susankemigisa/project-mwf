document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  // Load users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Find matching user
  let user = users.find(
    (u) => u.name === name && u.email === email && u.password === password
  );

  if (!user) {
    message.textContent = "❌ Invalid login credentials!";
    return;
  }

  // Save current user session
  localStorage.setItem("currentUser", JSON.stringify(user));

  // Role-based redirect
  if (user.role === "Attendant") {
    window.location.href = "sales"; // attendants → sales
  } else if (user.role === "Manager") {
    window.location.href = "dashboard"; // managers → dashboard
  } else {
    message.textContent = "⚠️ Role not recognized.";
  }
});
