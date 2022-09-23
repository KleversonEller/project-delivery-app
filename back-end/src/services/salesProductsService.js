const { sales: salesProductsModel } = require('../database/models');

class SalesProductsService {
  constructor() {
    this.model = salesProductsModel;
  }
  
  async createSales(sales) {
    const { id, userId, sallerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status } = sales;


  if (await this.model.findOne({ where: { sallerId } })) {
    throwMyError(StatusCodes.CONFLICT, 'Venda cadastrada');
  }
  const newSales = await this.model.create({ ...sales });
  return newSales;
  }
}

module.exports = new SalesProductsService();