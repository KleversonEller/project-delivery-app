const { StatusCodes } = require('http-status-codes');
const SalesProductsService = require('../services/salesProductsService');

class SalesProductController {
  constructor() {
    this.service = SalesProductsService;
  }

  async createSales(req, res) {
    const sales = req.body;
    const result = await SalesProductsService.createSales(sales);
    res.status(201).json(result);
  }
}

module.exports = new SalesProductController();