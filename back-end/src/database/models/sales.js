'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sales', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: DataTypes.DECIMAL(9,2),
    deliveryAddress: DataTypes.STRING(100),
    deliveryNumber: DataTypes.STRING(50),
    saleDate: DataTypes.STRING(50),
    status: DataTypes.STRING(50),
  }, {
    tableName: 'Sales',
    timestamps: false,
    underscored: true,
  });

  Sales.associate = (models) => {
    Sales.belongsTo(models.Users, [
      {
        as: 'user', foreignKey: 'userId',
      },
      {
        as: 'user', foreignKey: 'sellerId',
      },
    ]);
  }

  return Sales;
};