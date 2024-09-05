const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/entrar', async (req, res) => {
  const { nick } = req.body;
  const token = await usuarioController.registrarEntrada(nick);
  res.status(200).json({ token });
});

module.exports = router;
