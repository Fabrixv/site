
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

// Logout
function logout() {
  location.href = "alogin.html";
}
const menuBtn = document.getElementById("menuBtn");
const menuLateral = document.getElementById("menuLateral");

// Abrir / fechar menu
menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  menuLateral.classList.toggle("aberto");
});

// Fechar clicando fora
document.addEventListener("click", (e) => {
  if (!menuLateral.contains(e.target) && e.target !== menuBtn) {
    menuLateral.classList.remove("aberto");
  }
});