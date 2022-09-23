const { sales: salesProductsModel } = require('../database/models');

class SalesProductsService {
  constructor() {
    this.model = salesProductsModel;
  }
  
  async createSales(sales) {
    const { id, user_id, saller_id, total_price, delivery_adress, delivery_number, sale_date, status } = sales;


  if (await salesProductsModel.findOne({ where: { saller_id } })) {
    throwMyError(StatusCodes.CONFLICT, 'Venda cadastrada');
  }
  const newSales = await salesProductsModel.create({ ...sales });
  return newSales;
  }
}

module.exports = new SalesProductsService();