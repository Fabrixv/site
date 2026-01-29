emailjs.init("MFmGIKlJaB3dC5fJl");

const form = document.getElementById("formSuporte");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_t7k0r1e",
    "template_dks2bhy",
    this
  ).then(() => {
    alert("Mensagem enviada com sucesso!");
    form.reset();
  }, () => {
    alert("Erro ao enviar. Tente novamente.");
  });
});

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
