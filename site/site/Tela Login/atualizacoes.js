
window.onload = ()=>{
    polling(5);
}
  fetch('http://localhost:1880/atualizacoes/log', {
    method: "GET"
  }).then((resposta) => {
    console.log(resposta)
    if (resposta.ok) {
      resposta.json()
    }
  })


function polling(segundos){
    setTimeout(()=>{
        buscarDadosBancadaEstoque();
        buscarDadosBancadaProcesso();
        buscarDadosBancadaMontagem();
        buscarDadosBancadaExpedicao();
        polling(segundos);
    },segundos*1000)
}

  let dados = {
    hui: 50,
    ai00: 500,
    vrms: 220,
    irms: 10,
    appp: 2000,
    actp: 1500
};

function variar(valor, min, max, passo) {
    let novo = valor + (Math.random() * passo * 2 - passo);
    return Math.max(min, Math.min(max, novo));
}

function atualizarDados() {
    // Atualiza valores
    dados.hui = variar(dados.hui, 30, 70, 2);
    dados.ai00 = variar(dados.ai00, 0, 1023, 20);
    dados.vrms = variar(dados.vrms, 210, 230, 1);
    dados.irms = variar(dados.irms, 5, 15, 0.5);
    dados.appp = dados.vrms * dados.irms;
    dados.actp = dados.appp * (Math.random() * 0.3 + 0.7); 

    // Coloca nas DIVs
    document.getElementById("dados-estoque").innerHTML = `
<div class="card">
    <h2>Estoque</h2>
    <p>Umidade: ${dados.hui.toFixed(2)}%</p>
    <p>AI00: ${Math.round(dados.ai00)}</p>
    <p>VRMS: ${dados.vrms.toFixed(2)} V</p>
    <p>IRMS: ${dados.irms.toFixed(2)} A</p>
    <p>Potência Aparente: ${dados.appp.toFixed(2)} VA</p>
    <p>Potência Ativa: ${dados.actp.toFixed(2)} W</p>
</div>
`;;

    document.getElementById("dados-processo").innerHTML = `
        <h2>Processo</h2>
<div class="card">

    <p>Umidade: ${dados.hui.toFixed(2)}%</p>
    <p>AI00: ${Math.round(dados.ai00)}</p>
    <p>VRMS: ${dados.vrms.toFixed(2)} V</p>
    <p>IRMS: ${dados.irms.toFixed(2)} A</p>
    <p>Potência Aparente: ${dados.appp.toFixed(2)} VA</p>
    <p>Potência Ativa: ${dados.actp.toFixed(2)} W</p>
</div>
`;
    document.getElementById("dados-montagem").innerHTML = `
        <h2>Montagem</h2>
<div class="card">
    <p>Umidade: ${dados.hui.toFixed(2)}%</p>
    <p>AI00: ${Math.round(dados.ai00)}</p>
    <p>VRMS: ${dados.vrms.toFixed(2)} V</p>
    <p>IRMS: ${dados.irms.toFixed(2)} A</p>
    <p>Potência Aparente: ${dados.appp.toFixed(2)} VA</p>
    <p>Potência Ativa: ${dados.actp.toFixed(2)} W</p>
</div>
`;
    document.getElementById("dados-expedição").innerHTML = `
        <h2>Expedição</h2>
<div class="card">
    
    <p>Umidade: ${dados.hui.toFixed(2)}%</p>
    <p>AI00: ${Math.round(dados.ai00)}</p>
    <p>VRMS: ${dados.vrms.toFixed(2)} V</p>
    <p>IRMS: ${dados.irms.toFixed(2)} A</p>
    <p>Potência Aparente: ${dados.appp.toFixed(2)} VA</p>
    <p>Potência Ativa: ${dados.actp.toFixed(2)} W</p>
</div>
`;
}

// Atualiza a cada 2 segundos
setInterval(atualizarDados, 2000);

// Primeira execução
atualizarDados();


        //Parte desativada
        // somente para exemplo

//function atualizarDadosBancada(id, data){
   // const box = document.getElementById(id);
    //if(box) {
       // box.innerHTML = `//humi: ${data.humi} <br> ai00: ${data.ai00} <br> vrms: ${data.vrms} <br> irms: ${data.irms} <br> appp: ${data.appp} <br> actp: ${data.actp}`;
    //}
//}

//function buscarDadosBancadaEstoque(){                                 
    //fetch('http://10.77.241.113:1880/api/smartsense/estoque')
    //.then(res=>res.json())
    //.then(data=>atualizarDadosBancada('dados-estoque', data));
//}
//
//function buscarDadosBancadaProcesso(){                                 
    //fetch('http://10.77.241.113:1880/api/smartsense/processo')
    //.then(res=>res.json())
    //.then(data=>atualizarDadosBancada('dados-processo', data));
//}

//function buscarDadosBancadaMontagem(){                                 
    //fetch('http://10.77.241.113:1880/api/smartsense/montagem')
    //.then(res=>res.json())
    //.then(data=>atualizarDadosBancada('dados-montagem', data));
//}


//function buscarDadosBancadaExpedicao(){                                
    //fetch('http://10.77.241.113:1880/api/smartsense/expedicao')
    //.then(res=>res.json())
    //.then(data=>atualizarDadosBancada('dados-expedição', data));
//}

