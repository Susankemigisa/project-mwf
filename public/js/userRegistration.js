const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const role = document.getElementById("role").value;

  if (password !== confirmPassword) {
    message.textContent = "❌ Passwords do not match!";
    message.classList.replace("text-success", "text-danger");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // 🔎 Check if email already exists
  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    message.textContent = "⚠️ Account already exists. Redirecting to login...";
    message.classList.replace("text-success", "text-warning");

    setTimeout(() => {
      window.location.href = "login";
    }, 1500);

    return; // stop here
  }

  // Save new user (including password for login)
  const user = { 
    name: fullName, 
    email, 
    phone, 
    password, 
    role 
  };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = "✅ User registered successfully! Redirecting...";
  message.classList.replace("text-danger", "text-success");

  setTimeout(() => {
    window.location.href = "login";
  }, 1500);
});
