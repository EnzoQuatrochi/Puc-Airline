function codigoValido(){
    let resultado = false;
    const strCodigo = document.getElementById("codigo").value;
    const codigo = parseInt(strCodigo);
    if (codigo > 0){
    resultado = true;
    }
    return resultado; 
}

function preencheuAeronave() {
    let resultado = false;
    const aeronave = document.getElementById("aeronave").value;
    if (aeronave.trim().length > 0) {
        resultado = true;
    }
    return resultado;
}

function preencheuAeroportoPartida() {
    let resultado = false;
    const aeroportoPartida = document.getElementById("aeroportoPartida").value;
    if (aeroportoPartida.trim().length > 0) {
        resultado = true;
    }
    return resultado;
}

function preencheuAeroportoDestino() {
    let resultado = false;
    const aeroportoDestino = document.getElementById("aeroportoDestino").value;
    if (aeroportoDestino.trim().length > 0) {
        resultado = true;
    }
    return resultado;
}

function preencheuEscalas() {
    let resultado = false;
    const escalas = document.getElementById("escalas").value;
    if (escalas.trim().length > -1) {
        resultado = true;
    }
    return resultado;
}

function preencheuValorPassagem(){
    let resultado = false;
    const valor = document.getElementById("valor").value;
    if(valor.trim().length > 0){
        resultado = true;
    }
    return resultado;
}

function preencheuDataSaida(){
    let resultado = false;
    const dataSaida = document.getElementById("dataSaida").value;
    if(dataSaida.length > 0){
        resultado = true;
    }
    return resultado;
}

function preencheuHoraSaida(){
    let resultado = false;
    const horaSaida = document.getElementById("horaSaida").value;
    if(horaSaida.length > 0){
        resultado = true;
    }
    return resultado;
}

function preencheuDataChegada(){
    let resultado = false;
    const dataChegada = document.getElementById("dataChegada").value;
    if(dataChegada.trim().length != 0){
        resultado = true;
    }
    return resultado;
}

function preencheuHoraChegada(){
    let resultado = false;
    const horaChegada = document.getElementById("horaChegada").value;
    if(horaChegada.trim().length != 0){
        resultado = true;
    }
    return resultado;
}

function showStatusMessage(msg, error) {
    var pStatus = document.getElementById("status");
    
    if (error === true) {
        pStatus.className = "statusError";
    } else {
        pStatus.className = "statusSuccess";
    }
    pStatus.textContent = msg;
}

function fetchAlterar(body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/alterarVoo', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error("Erro durante a chamada da API:", error);
            throw error;
        });
}

window.Alterar = function(){

    if(!codigoValido()){
        showStatusMessage("Codigo inexistente", true);
        return;
    }

    if (!preencheuAeronave()) {
        showStatusMessage("Preencha corretamente a aeronave", true);
        return;
    }

    if (!preencheuAeroportoPartida()) {
        showStatusMessage("Preencha corretamente o aeroporto de partida", true);
        return;
    }

    if (!preencheuAeroportoDestino()) {
        showStatusMessage("Preencha corretamente o aeroporto de destino", true);
        return;
    }

    if (!preencheuEscalas()) {
        showStatusMessage("Preencha corretamente o total de escalas", true);
        return;
    }

    if(!preencheuValorPassagem()){
        showStatusMessage("Preencha corretamente o valor da passagem", true);
        return;
    }

    if(!preencheuDataSaida()){
        showStatusMessage("Preencha corretamente a data de saida do voo", true);
        return;
    }

    if(!preencheuHoraSaida()){
        showStatusMessage("Preencha corretamente a hora de saida do voo", true);
        return;
    }

    if(!preencheuDataChegada()){
        showStatusMessage("Preencha corretamente a data de chegada do voo", true);
        return;
    }

    if(!preencheuHoraChegada()){
        showStatusMessage("Preencha corretamente a hora de chegada do voo", true);
        return;
    }

    const codigo = document.getElementById("codigo").value;
    const aeronave = document.getElementById("aeronave").value;
    const aeroportoPartida = document.getElementById("aeroportoPartida").value;
    const aeroportoDestino = document.getElementById("aeroportoDestino").value;
    const escalas = document.getElementById("escalas").value;
    const valor = document.getElementById("valor").value;
    const dataSaida = document.getElementById("dataSaida").value;
    const horaSaida = document.getElementById("horaSaida").value;
    const dataChegada = document.getElementById("dataChegada").value;
    const horaChegada = document.getElementById("horaChegada").value;

    console.log(JSON.stringify({
        codigo: codigo,
        aeronave: aeronave,
        aeroportoPartida: aeroportoPartida,
        aeroportoDestino: aeroportoDestino,
        escalas: escalas,
        valor: valor,
        dataSaida: dataSaida,
        horaSaida: horaSaida,
        dataChegada: dataChegada,
        horaChegada: horaChegada,
    }));    

    fetchAlterar({
        codigo: codigo,
        aeronave: aeronave,
        aeroportoPartida: aeroportoPartida,
        aeroportoDestino: aeroportoDestino,
        escalas: escalas,
        valor: valor,
        dataSaida: dataSaida,
        horaSaida: horaSaida,
        dataChegada: dataChegada,
        horaChegada: horaChegada,
    })
    .then(resultado => {
        if (resultado.status === "SUCCESS") {
            showStatusMessage("Aeronave alterada. ", false);
            fetchAlterar();
        } else {
            showStatusMessage(`Erro ao alterar aeronave: ${resultado.message}`, true);
            console.log(resultado.message);
        }
    })
    .catch(error => {
        showStatusMessage(`Erro durante a chamada da API: ${error.message}`, true);
        console.error("Erro durante a chamada da API:", error);
    });    
}

var menuItems = document.querySelectorAll('.menu .list-item.parent');

menuItems.forEach(function(menuItem) {
    menuItem.addEventListener('click', function() {
        
        var allSubmenus = document.querySelectorAll('.menu .list-item .submenu');
        allSubmenus.forEach(function(submenu) {
            if (submenu !== this.querySelector('.submenu')) {
                submenu.style.display = 'none';
            }
        }, this);

        var submenu = this.querySelector('.submenu');
        if (submenu) {
            submenu.style.display = (submenu.style.display === 'block') ? 'none' : 'block';
        }
    });
});

var menu = document.querySelector('.menu');

menu.addEventListener('mouseout', function(e) {
    
    var isOverSubmenu = e.relatedTarget && (e.relatedTarget.className === 'submenu' || e.relatedTarget.className === 'sub-item');

    if (!isOverSubmenu) {
        var allSubmenus = document.querySelectorAll('.menu .list-item .submenu');
        allSubmenus.forEach(function(submenu) {
            submenu.style.display = 'none';
        });
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.sub-item, .parent').forEach(item => {
        item.addEventListener('click', event => {
            if (!event.target.querySelector('.submenu')) {
                window.location.href = event.target.getAttribute('data-href');
            }
        });
    });
});