'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('salesProducts', {
    sale_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    quantity: DataTypes.INTEGER,
  }, {
    tableName: 'salesProducts',
    timestamps: false,
  })

  User.associate = (models) => {
    // User.hasMany(models.BlogPost, {as: 'blogpost', foreignKey: 'userId'})
  }

  return User;
};