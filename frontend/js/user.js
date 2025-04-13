const api = "http://localhost:3000/api";

// Handle Register
document.getElementById("userRegisterForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  const res = await fetch(`${api}/customer/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Registered successfully!");
    window.location.href = "user-login.html";
  } else {
    alert(data.message || "Registration failed.");
  }
});

// Handle Login
document.getElementById("userLoginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${api}/customer/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("user", JSON.stringify(data.user));
    const userId = data.user.id;
    localStorage.setItem("userId", userId);
    window.location.href = "user-dashboard.html";
  } else {
    alert(data.message || "Login failed.");
  }
});
