
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const salaRouter = require('./routers/salaRouter');
const usuarioRouter = require('./routers/usuarioRouter');


app.use('/salas', salaRouter); 
app.use('/', usuarioRouter); 
app.use('/criar', salaRouter);    
app.use('/mensagem', salaRouter);    
app.use('/entar', usuarioRouter);      
app.use('/sair', salaRouter);      


app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Chat!');
});

module.exports = app;


