'use strict';

module.exports = (sequelize, _DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts', {});

  SalesProducts.associate = (models) => {
    models.Products.belongsToMany(models.Sales, {
      as: 'sales',
      foreignKey: 'product_id',
      otherKey: 'sale_id',
      through: SalesProducts,
    })
  };

  SalesProducts.associate = (models) => {
    models.Sales.belongsToMany(models.Products, {
      as: 'products',
      foreignKey: 'sale_id',
      otherKey: 'product_id',
      through: SalesProducts,
    })
  };

  return SalesProducts;
};
