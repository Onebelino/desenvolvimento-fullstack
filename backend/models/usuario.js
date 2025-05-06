const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Usuario = db.define('Usuario', {
  nome: DataTypes.STRING,
  email: DataTypes.STRING
});

module.exports = Usuario;