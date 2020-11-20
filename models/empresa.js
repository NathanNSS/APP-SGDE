'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Empresa.belongsToMany(models.Funcionario,{
        foreignKey:'idEmpresas',
        through: 'funcionario_empresa',
        as:'funcionarios'
      })
    }
  };
  Empresa.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    cpfCnpj: DataTypes.STRING,
    idFuncionarios: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Empresa',
  });
  return Empresa;
};