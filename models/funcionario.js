'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Funcionario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Funcionario.belongsToMany(models.Empresa,{
        foreignKey:'idFuncionarios',
        through: 'funcionario_empresa',
        as:'funcionarios'
      })
    }
  };
  Funcionario.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    cpf: DataTypes.STRING,
    idEmpresas: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Funcionario',
  });
  return Funcionario;
};