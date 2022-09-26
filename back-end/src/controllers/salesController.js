const { StatusCodes } = require('http-status-codes');
const SalesService = require('../services/salesService');

class SalesController {
  constructor() {
    this.service = SalesService;
  }

  async create(req, res) {
    const sale = {
      userId: req.user.id,
      sellerId: req.body.sellerId,
      totalPrice: req.body.totalPrice,
      deliveryAddress: req.body.deliveryAddress,
      deliveryNumber: req.body.deliveryNumber,
    };

    const { products } = req.body;

    const result = await this.service.create(sale, products);

    res.status(StatusCodes.CREATED).json(result);
  }
}

module.exports = new SalesController();