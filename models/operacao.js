'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Operacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Operacao.init({
    nomeProduto: DataTypes.STRING,
    quantidade: DataTypes.STRING,
    valor: DataTypes.STRING,
    imgProduto: DataTypes.STRING,
    codigoProduto: DataTypes.STRING,
    idFuncionario: DataTypes.INTEGER,
    idEmpresa: DataTypes.INTEGER,
    dataHora: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Operacao',
  });
  return Operacao;
};