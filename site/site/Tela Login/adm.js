const logged = JSON.parse(localStorage.getItem("logged_user"));

// segurança: só admin entra
if (!logged || logged.role !== "admin") {
  location.href = "telalog.html";
}

// carrega usuários
const users = JSON.parse(localStorage.getItem("app_users")) || [];
const table = document.getElementById("userTable");

users.forEach(u => {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${u.id || "-"}</td>
    <td>${u.user}</td>
    <td>${u.role || "user"}</td>
  `;

  table.appendChild(tr);
});

// logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("logged_user");
  location.href = "telalog.html";
});
