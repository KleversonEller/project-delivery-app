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
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      foreignKey: 'productId',
      otherKey: 'salesId',
      through: SalesProducts,
    })
  };

  SalesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      as: 'products',
      foreignKey: 'salesId',
      otherKey: 'productId',
      through: SalesProducts,
    })
  };

  return SalesProducts;
};
