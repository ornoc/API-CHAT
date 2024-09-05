const salaModel = require('../models/salaModel');

exports.get = async (req, res) => {
  const salas = await salaModel.listarSalas();
  res.status(200).json(salas);
};

  exports.entrar = async (idUser, idSala) => {
    const sala = await salaModel.buscarSala(idSala);
    const usuarioModel = require('../models/usuarioModel');
    const user = await usuarioModel.buscarUsuario(idUser);
  
    user.sala = { _id: sala._id, nome: sala.nome, tipo: sala.tipo };
    await usuarioModel.alterarUsuario(user);
  
    return { msg: "Entrou na sala", timestamp: Date.now() };
  };

  exports.criarSala = async (nome, tipo) => {
    const novaSala = { nome, tipo, msgs: [] };
    await salaModel.criarSala(novaSala);
    return novaSala;

};
    exports.enviarMensagem = async (nick, msg, idSala) => {
        const sala = await salaModel.buscarSala(idSala);
        const timestamp = Date.now();
      
        if (!sala.msgs) sala.msgs = [];
        sala.msgs.push({ timestamp, msg, nick });
      
        await salaModel.atualizarMensagens(sala);
        return { msg: "Mensagem enviada", timestamp };
      
  };

  exports.buscarMensagens = async (idSala, timestamp) => {
    const mensagens = await salaModel.buscarMensagens(idSala, timestamp);
    return { timestamp: mensagens[mensagens.length - 1]?.timestamp || null, msgs: mensagens };
  };
  
  exports.sair = async (idUser, idSala) => {
    const usuarioModel = require('../models/usuarioModel');
    const user = await usuarioModel.buscarUsuario(idUser);
  
    if (user.sala && user.sala._id === idSala) {
      delete user.sala;
      await usuarioModel.alterarUsuario(user);
    }
  
    return { msg: "Saiu da sala" };
  };
  
