// Função para definir a cor do status
function getCor(estado) {
    switch (estado) {
        case "verde": return "green";
        case "amarelo": return "orange";
        case "vermelho": return "red";
        default: return "black";
    }
}

// Buscar pedidos do localStorage 
function buscarDados() {
    const dados = JSON.parse(localStorage.getItem("pedidos")) || [];
    atualizarTabela(dados);
}

// Atualiza a tabela com os pedidos
function atualizarTabela(dados) {
    const tbody = document.querySelector("#tabela-bancadas tbody");
    tbody.innerHTML = "";

    dados.forEach(item => {
        const cor = getCor(item.status);
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.nome}</td>
            <td style="color:${cor}; font-weight:bold;">${item.status}</td>
            <td>${item.quantidade ?? 1}</td>
            <td>${item.nome_usuario ?? "-"}</td>
            <td>${item.data_criacao ?? "-"}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Adicionar novo pedido
function adicionarPedido() {
    const nome = document.getElementById("bancada").value;
    const quantidadeInput = document.getElementById("quantidade").value;
    const nomeUsuario = document.getElementById("nome_usuario").value.trim();
    const quantidade = quantidadeInput ? parseInt(quantidadeInput) : 1;

    if (!nome || !nomeUsuario || isNaN(quantidade) || quantidade < 1) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const pedido = {
        nome: nome,
        quantidade: quantidade,
        nome_usuario: nomeUsuario,
        status: "vermelho", // inicia sempre vermelho
        data_criacao: new Date().toLocaleString()
    };

    // Salva no localStorage
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    alert("Pedido adicionado!");
    buscarDados(); // atualiza tabela automaticamente

    // Limpa formulário
    document.getElementById("quantidade").value = 1;
    document.getElementById("nome_usuario").value = "";
}

// Atualiza a tabela a cada 2 segundos
setInterval(buscarDados, 2000);
buscarDados();