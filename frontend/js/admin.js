const api = "http://localhost:3000/api";

// Admin login
const loginForm = document.getElementById("adminLoginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    const res = await fetch(`${api}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("adminId", data.admin.id);
      window.location.href = "admin-dashboard.html";
    } else {
      alert(data.message);
    }
  });
}


