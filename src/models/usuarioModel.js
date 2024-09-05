const db = require('./db');

exports.criarUsuario = async (nick) => {
  const novoUsuario = { nick };
  await db.insertOne('usuarios', novoUsuario);
  return novoUsuario;
};
