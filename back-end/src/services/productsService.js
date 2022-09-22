const { products: productsModel } = require('../database/models');

class ProductsService {
  constructor() {
    this.model = productsModel;
  }
  
  async getAll() {
    return this.model.findAll();
  }
}

module.exports = new ProductsService();