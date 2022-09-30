const UserServices = require('../services/userService');

class UserController {
  constructor(service = UserServices) {
    this.service = service;
  }

  async create(req, res) {
    const user = req.body;
    const result = await this.service.create(user);
    res.status(201).json(result);
  }
  
  async getAll(req, res) {
    const { role } = req.params;
    const result = await this.service.getAll(role);
    res.status(200).json(result);
  }
  
  async registerAdmin(req, res) {
    const user = req.body;
    const result = await this.service.registerAdmin(user);
    res.status(201).json(result);
  }
   
  async getAllUser(req, res) {
    const result = await this.service.getAllUser();
    res.status(201).json(result);
  }
}

module.exports = new UserController();