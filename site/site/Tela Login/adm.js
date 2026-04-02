let linhaSelecionada = null;
let dadosAntigos = null;
// ================= LISTAR =================

 function carregarUsuarios() {
    fetch("http://localhost:1880/listar/users")
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
                    <td>${user.email}</td>
                `;

            
                tr.addEventListener("click", () => {

                    document.getElementById("id").value = user.id;
                    document.getElementById("nome").value = user.nome;
                    document.getElementById("sobrenome").value = user.sobrenome;
                    document.getElementById("email").value = user.email;
                    document.getElementById("user").value = user.usuario;
                    document.getElementById("pass").value = user.senha; 

                    console.log("ID SETADO:", user.id); // TESTE
                });

                tbody.appendChild(tr);
            });

        })
        .catch(err => console.error("Erro:", err));
}

function preencherFormulario(user, linha) {

    // salva os dados antigos
    dadosAntigos = { ...user };

    document.getElementById("id").value = user.id;
    document.getElementById("nome").value = user.nome;
    document.getElementById("sobrenome").value = user.sobrenome;
    document.getElementById("email").value = user.email;
    document.getElementById("user").value = user.usuario;
    document.getElementById("pass").value = user.senha;
}

// ================= BUSCAR =================
async function buscarUserEdicao() {
    let id = document.getElementById("id").value;

    const res = await fetch("http://localhost:1880/cadastros/buscar", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ id })
    });

    const data = await res.json();
    if (!data.length) return alert("Não encontrado");

    preencherFormulario(data[0], null);
}

// ================= SALVAR =================
document.getElementById("salvar").onclick = () => {

    let novosDados = {
        id: document.getElementById("id").value,
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        email: document.getElementById("email").value,
        user: document.getElementById("user").value,
        pass: document.getElementById("pass").value
    };

    // montar comparação
    let mudancas = [];

    if (dadosAntigos) {
        if (dadosAntigos.nome !== novosDados.nome)
            mudancas.push(`Nome: ${dadosAntigos.nome} → ${novosDados.nome}`);

        if (dadosAntigos.sobrenome !== novosDados.sobrenome)
            mudancas.push(`Sobrenome: ${dadosAntigos.sobrenome} → ${novosDados.sobrenome}`);

        if (dadosAntigos.email !== novosDados.email)
            mudancas.push(`Email: ${dadosAntigos.email} → ${novosDados.email}`);

        if (dadosAntigos.usuario !== novosDados.user)
            mudancas.push(`Usuário: ${dadosAntigos.usuario} → ${novosDados.user}`);

        if (dadosAntigos.senha !== novosDados.pass)
            mudancas.push(`Senha: ****** → ******`);
    }

    // mostra o que mudou
    if (mudancas.length > 0) {
        alert("Alterações:\n\n" + mudancas.join("\n"));
    } else {
        
    }

    // envia pro backend
    fetch(`http://localhost:1880/usuarios/${novosDados.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(novosDados)
    })
    .then(() => {
        alert("Atualizado!");
        carregarUsuarios();
    });
};

// ================= DELETAR =================
document.getElementById("deletar").onclick = () => {

    let id = document.getElementById("id").value;

    if (!confirm("Tem certeza?")) return;

    fetch(`http://localhost:1880/usuarios/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ id })
    })
    .then(() => {
        alert("Deletado!");
        carregarUsuarios();
    });
};

// ================= LOGOUT =================
document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("logged_user");
    location.href = "telalog.html";
};

// ================= MOSTRAR SENHA =================
document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("showPass").addEventListener("change", (e) => {
    document.getElementById("pass").type = e.target.checked ? "text" : "password";
  });

});

// ================= LOAD =================
window.onload = carregarUsuarios;
function toggleSenha(id, btn) {
  const input = document.getElementById(id);

  if (input.type === "password") {
    input.type = "text";
    btn.textContent = "🙉"; 
  } else {
    input.type = "password";
    btn.textContent = "🙈"; 
  }
}