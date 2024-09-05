const usuarioModel = require('../models/usuarioModel');
const token = require('../util/token');

exports.registrarEntrada = async (nick) => {
  const usuario = await usuarioModel.criarUsuario(nick);
  return token.generateToken(usuario);
};
