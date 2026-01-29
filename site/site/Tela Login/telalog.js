function logar(e) {
  //Prevenir o recarregamento da página
  e.preventDefault();


  //Busca os inputs do HTML
  let input_usuario = document.getElementById("usuario");
  let input_senha = document.getElementById("senha");

  //Tratamento de erros, caso não tiver esses elementos
  if (!input_usuario || !input_senha) {
    return;
  }

  console.log(input_usuario)

  //Se chegou até aqui, conseguiu coletar usuário e senha
  let usuario = input_usuario.value;
  let senha = input_senha.value;




}
/* Sistemas de aleatorização de partículas */
(function () {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  const particles = [];
  const COUNT = Math.round(window.innerWidth / 12);

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 0.8 + Math.random() * 1.8,
      v: 0.6 + Math.random() * 2
    });
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.y += p.v;
      if (p.y > canvas.height + 10) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(frame);
  }
  frame();
})();

/* ---------------- Seletores ---------------- */
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

  if (view === 'login') {
    loginView.style.display = 'block';
    document.getElementById('mainTitle').textContent = 'Entrar';
  } else if (view === 'create') {
    createView.style.display = 'block';
    document.getElementById('mainTitle').textContent = 'Criar Conta';
  } else if (view === 'forgot') {
    forgotView.style.display = 'block';
    document.getElementById('mainTitle').textContent = 'Recuperar Senha';
  }
}

/* ---------------- Mostrar senha ---------------- */
function toggleSenha(id, btn) {
  const input = document.getElementById(id);
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '🙉';
  }
}

/* ---------------- Criar conta ---------------- */
document.getElementById('btnCreate').addEventListener('click', () => {

  const data = {
    nome: document.getElementById('newNome').value.trim(),
    sobrenome: document.getElementById('newSobrenome').value.trim(),
    nascimento: document.getElementById('newNascimento').value,
    email: document.getElementById('newEmail').value.trim(),
    user: document.getElementById('newUser').value.trim(),
    pass: document.getElementById('newPass').value
  };
  fetch("http://localhost:1880/auth/autenticar", {

    method: "POST",
    body: JSON.stringify(data)
  }).then((resposta) => {
    console.log(resposta)
    if (resposta.ok) {
      resposta.json()
    }
  }).then((usuario) => {
    window.location.href = "telalog.html";
  })
})
/* -------
  if (!data.nome || !data.sobrenome || !data.nascimento || !data.email || !data.user || !data.pass) {
    alert("Preencha todos os campos!");
    return;
  }


  alert('Conta criada com sucesso!');
  showView('login');
});

/* ---------------- Login ---------------- */
document.getElementById('btnLogin').addEventListener('click', () => {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;

  fetch("http://localhost:1880/autenticacao/autenticar", {
    method: "POST",
    body: JSON.stringify({ user, pass })
  }).then((resposta) => {
    console.log(resposta)
    if (resposta.ok) {
      resposta.json()
    }
  }).then((usuario) => {
    window.location.href = "Alogin.html";
  })
  const acc = {
    user: "",
    pass: ""
  };


  if (user === acc.user && pass === acc.pass) {
    alert("Login bem-sucedido!");
    location.href = "Alogin.html";
  } else {
    alert("Usuário ou senha incorretos!");
  }
});

/* ---------------- Recuperar senha ---------------- */
document.getElementById('btnRecover').addEventListener('click', () => {
  const emailTry = document.getElementById('recoverEmail').value.trim();
  const acc = JSON.parse(localStorage.getItem('app_account') || '{}');

  if (emailTry === acc.email) {
    alert("Sua senha é: " + acc.pass);
    showView('login');
  } else {
    alert("E-mail não encontrado!");
  }
});

// ===== CRIA ADMIN FIXO (UMA VEZ) =====
const ADMIN = {
  id: "admin-001",
  user: "admin",
  pass: "admin123",
  role: "admin",
  locked: true
};

let users = JSON.parse(localStorage.getItem("app_users"));

if (!users) {
  localStorage.setItem("app_users", JSON.stringify([ADMIN]));
}

// ===== LOGIN =====
document.getElementById('btnLogin').addEventListener('click', () => {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;

  const users = JSON.parse(localStorage.getItem("app_users")) || [];

  const found = users.find(u => u.user === user && u.pass === pass);

  if (!found) {
    return;
  }

  // salva quem logou
  localStorage.setItem("logged_user", JSON.stringify(found));

  // redireciona
  if (found.role === "admin") {
    location.href = "adm.html";
  } else {
    location.href = "Alogin.html";
  }
});


