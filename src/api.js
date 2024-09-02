// src/api.js
const express = require('express');
const router = express.Router();
const salaController = require('./controllers/salaController');
const usuarioController = require('./controllers/usuarioController');
const token = require('./util/token');

router.post('/usuario/entrar', async (req, res) => {
    try {
        const { nick } = req.body;
        if (!nick) {
            return res.status(400).json({ message: 'O nome de usuário é obrigatório' });
        }
        const resultado = await usuarioController.registrarUsuario(nick);
        res.status(200).json(resultado);
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
});

module.exports = router;
router.get('/salas', async (req, res) => {
    if (await token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)) {
        let resp = await salaController.listarSalas();
        res.status(200).send(resp);
    } else {
        res.status(400).send({ msg: "Usuário não autorizado" });
    }
});
router.put('/sala/entrar', async (req, res) => {
    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)) return res.status(403).send({ msg: "Usuário não autorizado" });

    let resp = await salaController.entrarNaSala(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);
});

router.post('/sala/mensagem', async (req, res) => {
    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)) return res.status(403).send({ msg: "Usuário não autorizado" });

    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idSala);
    res.status(200).send(resp);
});

router.get('/sala/mensagens', async (req, res) => {
    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)) return res.status(403).send({ msg: "Usuário não autorizado" });

    let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);
});

module.exports = router;
