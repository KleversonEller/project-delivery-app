const Sequelize = require('sequelize');
const { StatusCodes } = require('http-status-codes');
const { sales: salesModel } = require('../database/models');
const SalesProductsService = require('./salesProductsService');
const config = require('../database/config/config');
const throwMyError = require('../utils/throwMyError');
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

  async getById(id) {
    const sale = await this.model.findByPk(id);

    if (!sale) throwMyError(StatusCodes.NOT_FOUND, 'Venda não encontrada');

    return sale;
  }
}

module.exports = new SalesService();