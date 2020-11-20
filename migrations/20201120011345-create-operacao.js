'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Operacaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomeProduto: {
        type: Sequelize.STRING
      },
      quantidade: {
        type: Sequelize.STRING
      },
      valor: {
        type: Sequelize.STRING
      },
      imgProduto: {
        type: Sequelize.STRING
      },
      idProduto: {
        type: Sequelize.INTEGER,
        references: { model: 'Produtos', key: 'id' }
      },
      idFuncionario: {
        type: Sequelize.INTEGER,
        references: { model: 'Funcionarios', key: 'id' }
      },
      idEmpresa: {
        type: Sequelize.INTEGER,
        references: { model: 'Empresas', key: 'id' }
      },
      dataHora: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Operacaos');
  }
};