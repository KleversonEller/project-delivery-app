'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('salesProducts', {
      salesId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'sales_id',
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'product_id',
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('salesProducts', {});
  }
};
