'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  };
  Produto.init({
    codigo: DataTypes.STRING,
    nomeProduto: DataTypes.STRING,
    quantidade: DataTypes.INTEGER,
    descricao: DataTypes.STRING,
    valor: DataTypes.FLOAT,
    nomeFornecedor: DataTypes.STRING,
    cnpjFornecedor: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    endereco: DataTypes.STRING,
    idFuncionarios: DataTypes.INTEGER,
    idEmpresas: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Produto',
  });
  return Produto;
};