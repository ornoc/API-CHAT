const salaModel = require('../models/salaModel');

exports.get = async () => {
    return await salaModel.listarSalas();
}

exports.create = async (nome) => {
    return await salaModel.criarSala(nome);
}
