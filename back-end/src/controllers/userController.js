const userServices = require('../services/userService');

const createUser = async (req, res) => {
  const user = req.body;
  const result = await userServices.createUser(user);
  res.status(201).json(result);
};

const getAll = async (req, res) => {
  const { role } = req.params;
  const result = await userServices.getAll(role);
  res.status(200).json(result);
}

module.exports = {
  createUser,
  getAll,
};