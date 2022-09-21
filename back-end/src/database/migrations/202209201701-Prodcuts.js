'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(4,2)
      },
      urlImage: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'url_image'
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products', {});
  }
};
