/* ---------------- Partículas ---------------- */
(function () {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const particles = [];
  const COUNT = Math.floor(window.innerWidth / 10);

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      v: Math.random() * 1 + 0.5
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      p.y += p.v;

      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
})();

/* ---------------- Views ---------------- */
const loginView = document.getElementById('loginView');
const createView = document.getElementById('createView');
const forgotView = document.getElementById('forgotView');

document.getElementById('toCreate').onclick = () => showView('create');
document.getElementById('toLogin').onclick = () => showView('login');
document.getElementById('toForgot').onclick = () => showView('forgot');
document.getElementById('backLogin').onclick = () => showView('login');

function showView(view) {
  loginView.style.display = 'none';
  createView.style.display = 'none';
  forgotView.style.display = 'none';

  if (view === 'login') loginView.style.display = 'block';
  if (view === 'create') createView.style.display = 'block';
  if (view === 'forgot') forgotView.style.display = 'block';
}

/* ---------------- Mostrar senha ---------------- */
function toggleSenha(id, btn) {
  const input = document.getElementById(id);

  if (input.type === "password") {
    input.type = "text";
    btn.textContent = "🙈";
  } else {
    input.type = "password";
    btn.textContent = "👁";
  }
}

/* ---------------- Cadastro ---------------- */
document.getElementById('btnCreate').addEventListener('click', () => {

  const data = {
    nome: document.getElementById('newNome').value.trim(),
    sobrenome: document.getElementById('newSobrenome').value.trim(),
    email: document.getElementById('newEmail').value.trim(),
    user: document.getElementById('newUser').value.trim(),
    pass: document.getElementById('newPass').value
  };

  // validação
  if (!data.nome || !data.sobrenome || !data.email || !data.user || !data.pass) {
    alert("Preencha todos os campos!");
    return;
  }

  fetch("http://localhost:1880/cadastrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    if (data.ok) {
      alert("Conta criada com sucesso!");
      location.href = "telalog.html";
    } else {
      alert("Erro ao cadastrar!");
    }
  })
  .catch(err => console.error("Erro:", err));
});

/* ---------------- Login ---------------- */
document.getElementById('btnLogin').addEventListener('click', () => {

  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;

  if (!user || !pass) {
    alert("Preencha usuário e senha!");
    return;
  }

  fetch("http://localhost:1880/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, pass })
  })
  .then(res => {
    if (!res.ok) throw new Error("Erro na requisição");
    return res.json();
  })
  .then(data => {
    if (data.success) {
      window.location.href = "Alogin.html";
    } else {
      alert("Usuário ou senha incorretos!");
    }
  })
  .catch(err => console.error("Erro login:", err));
});

/* ---------------- Recuperar senha ---------------- */
document.getElementById('btnRecover').addEventListener('click', () => {
  const email = document.getElementById('recoverEmail').value.trim();

  if (!email) {
    alert("Digite um email!");
    return;
  }

  alert("Função de recuperação ainda não integrada com banco.");
});