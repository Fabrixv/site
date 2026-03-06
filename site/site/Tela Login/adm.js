function carregarUsuarios() {
    fetch("http://localhost:1880/auth/autenticar")
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector("#usersTable tbody");
            tbody.innerHTML = "";

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



// logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("logged_user");
  location.href = "telalog.html";
});

// Salvar alterações
document.getElementById('salvar').onclick = () => {
  let nome = document.getElementById('nome').value.trim();
  let sobrenome = document.getElementById('sobrenome').value.trim();
  let email = document.getElementById('email').value.trim();
  let user = document.getElementById('user').value.trim();
  let pass = document.getElementById('pass').value;

  fetch('http://localhost:1880/alterar/user', {
    method: "POST",
    body: JSON.stringify({"msg":"", "nome": nome, "sobrenome": sobrenome, "email": email, "user": user, "pass": pass})
  }).then((resposta) => {
    console.log(resposta)
    if (resposta.ok) {
      resposta.json()
    }
  })
  };

// Deletar conta
document.getElementById('deletar').onclick = () => {
  if (confirm("Tem certeza que deseja deletar sua conta?")) {
  fetch("http://localhost:1880/deletar/user", {

    method: "POST",
    body: JSON.stringify({"msg": "deletar"})
  }).then((resposta) => {
    console.log(resposta)
    if (resposta.ok) {
      resposta.json()
    }
  })
    alert("Conta deletada!");
    location.href = "telalog.html";
  }
};
async function buscarUserEdicao() {

let id = document.getElementById("id").value.trim();

const resposta = await fetch("http://localhost:1880/buscar/user", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ id: id })
});

const dados = await resposta.json();

if (!dados || dados.length === 0) {
  alert("Usuário não encontrado");
  return;
}
let user = dados[0];

document.getElementById("nome").value = user.nome;
document.getElementById("sobrenome").value = user.sobrenome;
document.getElementById("email").value = user.email;
document.getElementById("user").value = user.user;
document.getElementById("pass").value = user.pass;
};