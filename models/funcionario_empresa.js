'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Funcionario_Empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Funcionario_Empresa.belongsTo(models.Funcionario);
      Funcionario_Empresa.belongsTo(models.Empresa);
    }
  };
  Funcionario_Empresa.init({
    idFuncionarios: DataTypes.INTEGER,
    idEmpresas: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Funcionario_Empresa',
  });
  return Funcionario_Empresa;
};