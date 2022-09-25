const { sales: salesModel, salesProducts: salesProductsModel } = require('../database/models');

class SalesProductsService {
  constructor() {
    this.model = salesModel;
    this.modelSalesProducts = salesProductsModel;
  }

  async createSalesProducts(products, saleId) {
  const newSalesProducts = Promise.all(products.map((ele) => this.modelSalesProducts.create({
    quantity: ele.quantity,
    saleId,
    productId: ele.productId,
  })));
  return newSalesProducts;
}
  
  async createSales(sales) {
    const {
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      products,
     } = sales;
     const newSales = await this.model.create({ 
       userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status: 'Pendente',
      });
    await this.createSalesProducts(products, newSales.dataValues.id);
    return newSales;
  }
}

module.exports = new SalesProductsService();