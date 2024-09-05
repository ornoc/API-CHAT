const express = require('express');
const router = express.Router();
const salaController = require('../controllers/salaController');
const token = require('../util/token');

router.get('/', async (req, res) => {
  if (token.checkToken(req.headers.token)) {
    let resp = await salaController.get();
    res.status(200).send(resp);
  } else {
    res.status(400).send({ msg: "Usuário não autorizado" });
  }
});

router.post('/criar', async (req, res) => {
    const { nome, tipo } = req.body;
    const sala = await salaController.criarSala(nome, tipo);
    res.status(201).json(sala);
  });

  router.put('/entrar', async (req, res) => {
    const { token, idUser, idSala } = req.headers;
    if (!await token.checkToken(token, idUser)) return res.status(401).send({ msg: 'Não autorizado' });
  
    const response = await salaController.entrar(idUser, idSala);
    res.status(200).json(response);
  });

  router.post('/mensagem', async (req, res) => {
    const { token, idUser, nick } = req.headers;
    const { msg, idSala } = req.body;
    if (!await token.checkToken(token, idUser)) return res.status(401).send({ msg: 'Não autorizado' });
  
    const response = await salaController.enviarMensagem(nick, msg, idSala);
    res.status(200).json(response);
  });
  

  router.put('/sair', async (req, res) => {
    const { token, idUser, idSala } = req.headers;
    if (!await token.checkToken(token, idUser)) return res.status(401).send({ msg: 'Não autorizado' });
  
    const response = await salaController.sair(idUser, idSala);
    res.status(200).json(response);
  });
  

module.exports = router;
