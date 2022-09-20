'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Products', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    urlImage: DataTypes.STRING,
  }, {
    tableName: 'Products',
    timestamps: false,
    underscored: true,
  });

  Product.associate = (models) => {
    Product.hasMany(models.SalesProducts, {as: 'salesProducts', foreignKey: 'productId'})
  }

  return Product;
};