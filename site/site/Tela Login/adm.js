function carregarUsuarios() {
    fetch("http://localhost:1880/admin/data") // rota do Node-RED
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector("#usersTable tbody");
            tbody.innerHTML = ""; // limpa antes de preencher

            data.forEach(user => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${user.nome}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>${user.loginAt}</td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(err => console.error("Erro ao carregar usuários:", err));
}

// Atualiza a tabela a cada 5 segundos (opcional)
setInterval(carregarUsuarios, 5000);

// Chama a função quando a página carregar
window.onload = carregarUsuarios;

// logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("logged_user");
  location.href = "telalog.html";
});