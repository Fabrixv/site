function carregarUsuarios() {
    fetch("http://localhost:1880/buscar/lista")
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector("#usersTable tbody");
            tbody.innerHTML = "";

            data.forEach(user => {
                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.nome}</td>
                    <td>${user.sobrenome}</td>
                    <td>${user.usuario}</td>
                    <td>${user.senha}</td>
                    <td>${user.dt_nascimento}</td>
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
  let id = document.getElementById("id").value.trim();

  fetch('http://localhost:1880/alterar/user', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"msg":"", "nome": nome, "sobrenome": sobrenome, "email": email, "user": user, "pass": pass, "id": id})
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
    body: JSON.stringify({"id": document.getElementById("id").value})
  }).then((resposta) => {
    console.log(resposta)
    if (resposta.ok) {
      resposta.json()
    }
  })
    alert("Conta deletada!");
  };
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
document.getElementById("user").value = user.usuario;
document.getElementById("pass").value = user.senha;
};


const passInput = document.getElementById("pass");
const showPass = document.getElementById("showPass");

showPass.addEventListener("change", () => {
  passInput.type = showPass.checked ? "text" : "password";
});