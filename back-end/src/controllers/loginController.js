const loginService = require('../services/loginService');

const login = async (req, res) => {
      const { email, password } = await loginService.validateBody(req.body);
      
      const result = await loginService.validateCredentials({ email, password });
      
      res.status(200).json(result);
};
  
  module.exports = {
    login,
  };