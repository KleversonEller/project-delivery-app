const Sequelize = require('sequelize');
const { StatusCodes } = require('http-status-codes');
const { sales: salesModel, products: productsModel } = require('../database/models');
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

  async getAllByUserId(userId) {
    const sales = await this.model.findAll({ where: { userId } });

    return sales;
  }

  async getAllBySellerId(sellerId) {
    const sales = await this.model.findAll({ where: { sellerId } });

    return sales;
  }

  async getById(id) {
    const sale = await this.model.findOne({
      where: { id },
      include: [{
        model: productsModel, as: 'products', through: { attributes: [] }
      }]
    });

    if (!sale) throwMyError(StatusCodes.NOT_FOUND, 'Venda não encontrada');

    const salesProducts = await this.salesProductsService
      .getBySaleId(sale.dataValues.id);

    const { products } = sale.dataValues;

    const newProducts = products.map((product, index) => (
      { ...product.dataValues, quantity:  salesProducts[index].quantity}));

    return { ...sale.dataValues, products: newProducts };
  }
}

module.exports = new SalesService();