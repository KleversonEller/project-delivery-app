const { StatusCodes } = require('http-status-codes');
const { sales: salesProductsModel } = require('../database/models');
const throwMyError = require('../utils/throwMyError');

class SalesProductsService {
  constructor() {
    this.model = salesProductsModel;
  }
  
  async createSales(sales) {
    const { sallerId } = sales;

  if (await this.model.findOne({ where: { sallerId } })) {
    throwMyError(StatusCodes.CONFLICT, 'Venda cadastrada');
  }
  const newSales = await this.model.create({ ...sales });
  return newSales;
  }
}

module.exports = new SalesProductsService();