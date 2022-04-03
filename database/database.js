// importanto o modulo do sequelize
const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'thorn', 'murtagh', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;