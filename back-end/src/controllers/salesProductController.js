const { StatusCodes } = require('http-status-codes');
const SalesProductsService = require('../services/salesProductsService');

class SalesProductController {
  constructor() {
    this.service = SalesProductsService;
  }

  async createSales(req, res) {
    const sales = req.body;
    const result = await this.service.createSales([sales]);
    res.status(StatusCodes.CREATED).json(result);
  }

  async getAllSales(req, res) {
    const result = await this.service.getAllSales();
    res.status(StatusCodes.OK).json(result);
  }
}

module.exports = new SalesProductController();