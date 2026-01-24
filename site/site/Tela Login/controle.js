const acc = JSON.parse(localStorage.getItem('app_account'));

if (!acc) {
  alert("Faça login primeiro!");
  location.href = "telalog.html";
}

// Preenche os campos
document.getElementById('nome').value = acc.nome;
document.getElementById('sobrenome').value = acc.sobrenome;
document.getElementById('email').value = acc.email;
document.getElementById('user').value = acc.user;
document.getElementById('pass').value = acc.pass;

// Salvar alterações
document.getElementById('salvar').onclick = () => {
  acc.nome = document.getElementById('nome').value.trim();
  acc.sobrenome = document.getElementById('sobrenome').value.trim();
  acc.email = document.getElementById('email').value.trim();
  acc.user = document.getElementById('user').value.trim();
  acc.pass = document.getElementById('pass').value;

  localStorage.setItem('app_account', JSON.stringify(acc));
  alert("Dados atualizados com sucesso!");
};

// Deletar conta
document.getElementById('deletar').onclick = () => {
  if (confirm("Tem certeza que deseja deletar sua conta?")) {
    localStorage.removeItem('app_account');
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