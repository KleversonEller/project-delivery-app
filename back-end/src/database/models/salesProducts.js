'use strict';

module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('salesProducts', {
    saleId: {
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
    underscored: true,
    tableName: 'sales_products'
  },);

  SalesProducts.associate = (models) => {
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      foreignKey: 'productId',
      otherKey: 'saleId',
      through: SalesProducts,
    })
  };

  SalesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      as: 'products',
      foreignKey: 'saleId',
      otherKey: 'productId',
      through: SalesProducts,
    })
  };

  return SalesProducts;
};
