// src/models/salaModel.js
const db = require('./db');

exports.listarSalas = async () => {
  return await db.findAll('salas');
};

exports.buscarSala = async (idSala) => {
  return await db.findOne('salas', idSala);
};

exports.criarSala = async (sala) => {
  return await db.insertOne('salas', sala);
};
