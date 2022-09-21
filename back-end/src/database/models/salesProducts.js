'use strict';

module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('salesProducts', {
    salesId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      primaryKey: true
    },
    productId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      primaryKey: true
    }, 
    quantity: DataTypes.INTEGER
  },
  {
    timestamps: false,
    underscored: false,
  },);

  SalesProducts.associate = (models) => {
    models.Products.belongsToMany(models.Sales, {
      as: 'sales',
      foreignKey: 'productId',
      otherKey: 'salesId',
      through: SalesProducts,
    })
  };

  SalesProducts.associate = (models) => {
    models.Sales.belongsToMany(models.Products, {
      as: 'products',
      foreignKey: 'salesId',
      otherKey: 'productId',
      through: SalesProducts,
    })
  };

  return SalesProducts;
};
