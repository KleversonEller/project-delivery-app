const userServices = require('../services/userService');

const createUser = async (req, res) => {
  const user = req.body;
  const result = await userServices.createUser(user);
  res.status(201).json(result);
};

module.exports = {
  createUser,
};