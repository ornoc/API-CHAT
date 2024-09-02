const path = require("path");
const express = require("express");
const WebSocket = require('ws');
const mongoose = require('mongoose');
const api = require("../src/api"); 
require('dotenv').config(); 

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado ao MongoDB com sucesso!"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));

app.use(express.static(path.join(__dirname, '../src/public')));
app.use(express.json()); // Necessário para o parsing de JSON no corpo das requisições
app.use('/api', api); // Usa as rotas da API

const port = process.env.API_PORT || 5000;
const wsPort = 5001;

app.listen(port, () => console.log(`Servidor Express está escutando na porta ${port}`));

const wss = new WebSocket.Server({ port: wsPort });

wss.on('connection', ws => {
    console.log('Novo cliente WebSocket conectado');

    ws.on('message', message => {
        console.log('Mensagem recebida:', message);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => console.log('Cliente WebSocket desconectado'));
});

console.log(`Servidor WebSocket está escutando na porta ${wsPort}`);
