'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  }, {
    timestamps: false,
    underscored: true,
  });

  Sales.associate = (models) => {
    Sales.belongsTo(models.users, [
      {
        as: 'users', foreignKey: 'userId',
      },
      {
        as: 'sellers', foreignKey: 'sellerId',
      },
    ]);
  }

  return Sales;
};