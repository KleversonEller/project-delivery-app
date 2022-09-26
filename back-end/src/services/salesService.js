const Sequelize = require('sequelize');
const { sales: salesModel } = require('../database/models');
const SalesProductsService = require('./salesProductsService');
const config = require('../database/config/config');
require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[environment]);

class SalesService {
  constructor() {
    this.model = salesModel;
    this.salesProductsService = SalesProductsService;
  }
  
  async create(sale, products) {
    const t = await sequelize.transaction();
    try {
      const newSales = await this.model.create(sale, { transaction: t });
 
      await Promise.all(
        products.map((product) => 
          this.salesProductsService.create(product, newSales.dataValues.id, t)),
      );
 
      await t.commit();
      return newSales;
    } catch (err) {
      await t.rollback();
      throw new Error(err.message);
    }
  }
}

module.exports = new SalesService();