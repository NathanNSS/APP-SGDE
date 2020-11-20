'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomeCliente: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      endereco: {
        type: Sequelize.STRING
      },
      cpfCnpj: {
        type: Sequelize.STRING
      },
      telefone: {
        type: Sequelize.STRING
      },
      idFuncionario: {
        type: Sequelize.INTEGER,
        references: { model: 'Funcionarios', key: 'id' }
      },
      idEmpresa: {
        type: Sequelize.INTEGER,
        references: { model: 'Empresas', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clientes');
  }
};