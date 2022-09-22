const { StatusCodes } = require('http-status-codes');
const ProductsService = require('../services/productsService');

class ProductsController {
  constructor() {
    this.service = ProductsService;
  }

  async getAll(_req, res) {
    const products = await this.service.getAll();

    res.status(StatusCodes.OK).json(products);
  }
}

module.exports = new ProductsController();