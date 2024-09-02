document.addEventListener('DOMContentLoaded', () => {
    const botaoEntrar = document.getElementById('botaoEntrar');
    const botaoEnviar = document.getElementById('botaoEnviar');

    botaoEntrar.addEventListener('click', entrar);
    botaoEnviar.addEventListener('click', enviarMensagem);
});

async function registrarUsuario(nick) {
    try {
        const response = await fetch('http://localhost:5000/api/usuario/entrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nick })
        });

        if (!response.ok) throw new Error('Erro ao registrar usuário');
        
        const result = await response.json();
        console.log('Usuário registrado:', result);
        return result;
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao registrar usuário. Verifique o console para mais detalhes.');
    }
}

async function entrar() {
    const nome = document.getElementById('nome').value;
    if (nome) {
        const resultado = await registrarUsuario(nome);
        if (resultado) {
            document.getElementById('telaEntrar').style.display = 'none';
            document.getElementById('telaEscolherSala').style.display = 'block';
        }
    } else {
        alert("Por favor, insira seu nome.");
    }
}

function entrarSala(nome, descricao, isPrivada) {
    if (isPrivada) {
        const senha = prompt("Esta sala é privada. Por favor, insira a senha:");
        if (senha !== "123") {
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
