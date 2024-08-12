function entrar() {
    const nome = document.getElementById('nome').value;
    if (nome) {
        document.getElementById('telaEntrar').style.display = 'none';
        document.getElementById('telaEscolherSala').style.display = 'block';
    } else {
        alert("Por favor, insira seu nome.");
    }
}

function entrarSala(nome, descricao, isPrivada) {
    if (isPrivada) {
        const senha = prompt("Esta sala é privada. Por favor, insira a senha:");
        if (senha !== "123") {  //senha
            alert("Senha incorreta!");
            return;
        }
    }

    document.getElementById('telaEscolherSala').style.display = 'none';
    document.getElementById('telaChat').style.display = 'block';
    document.getElementById('nomeSala').innerText = nome;
    document.getElementById('descricaoSala').innerText = descricao;
}

function enviarMensagem() {
    const mensagensDiv = document.getElementById('mensagens');
    const mensagemInput = document.getElementById('mensagemInput');
    const mensagemTexto = mensagemInput.value;

    if (mensagemTexto.trim() !== '') {
        const mensagemElemento = document.createElement('div');
        mensagemElemento.className = 'mensagem enviada';
        mensagemElemento.innerText = mensagemTexto;
        mensagensDiv.appendChild(mensagemElemento);

        // resposta automatica
        setTimeout(() => {
            const respostaElemento = document.createElement('div');
            respostaElemento.className = 'mensagem recebida';
            respostaElemento.innerText = 'Resposta: ' + mensagemTexto;
            mensagensDiv.appendChild(respostaElemento);
            mensagensDiv.scrollTop = mensagensDiv.scrollHeight;
        }, 1000);

        mensagemInput.value = '';
        mensagensDiv.scrollTop = mensagensDiv.scrollHeight;
    }
}

function sairChat() {
    document.getElementById('telaChat').style.display = 'none';
    document.getElementById('telaEscolherSala').style.display = 'block';
}
