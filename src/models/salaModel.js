const db = require("./db");

function listarSalas() {
    return db.findAll("salas");
}

/*
 * @param {string} nome
 * @returns 
 */
function criarSala(nome) {
    return db.insertOne("salas", { nome });
}

module.exports = { listarSalas, criarSala }
