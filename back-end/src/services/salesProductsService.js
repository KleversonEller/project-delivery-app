const { sales: salesModel } = require('../database/models');
// const throwMyError = require('../utils/throwMyError');

class SalesProductsService {
  constructor() {
    this.model = salesModel;
  }

//   async createSalesProducts(products, saleId) {
//   const newSalesProducts = Promise.all(products.map((ele) => salesProductsModel.create({
//     quantity: ele.quantity,
//     saleId: saleId,
//     productId: ele.productId,
//   })));
// }
  
  async createSales(sales) {
    const { userId,
      sallerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      // products,
     } = sales;
    const newSales = await this.model.create({ 
      userId, sallerId, totalPrice, deliveryAddress, deliveryNumber, status: 'pendente',
    });
    // await this.createSalesProducts(products, newSales.saleId)
    return newSales;
  }
}

module.exports = new SalesProductsService();