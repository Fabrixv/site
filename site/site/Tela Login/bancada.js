
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
