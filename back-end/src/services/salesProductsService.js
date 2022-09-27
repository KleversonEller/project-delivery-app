const { salesProducts: salesProductsModel } = require('../database/models');

class SalesProductsService {
  constructor() {
    this.model = salesProductsModel;
  }
  
  async create(product, saleId, transaction) {
    const salesProducts = this.model.create(
      {
        quantity: product.quantity,
        saleId,
        productId: product.productId,
      },
      { transaction },
    );
    return salesProducts;
  }

  async getBySaleId(saleId) {
    return this.model.findAll({ 
      where: { saleId },
      attributes: { exclude: ['saleId'] },
    });
  }

  async getAllSales() {
    const result = await this.model.findAll({});
    return result;
  }
}

module.exports = new SalesProductsService();