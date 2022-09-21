const loginService = require('../services/loginService');

const login = async (req, res) => {
      const { email, password } = await loginService.validateBody(req.body);

      const token = await loginService.validateCredentials({ email, password });
      
      res.status(200).json(token);
};
  
  module.exports = {
    login,
  };