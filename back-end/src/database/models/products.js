'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('products', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    urlImage: DataTypes.STRING,
  }, {
    underscored: true,
    timestamps: false
  });

  // Product.associate = (models) => {
  //   Product.hasMany(models.SalesProducts, {as: 'salesProducts', foreignKey: 'productId'})
  // }

  return Product;
};