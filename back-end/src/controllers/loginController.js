const loginService = require('../services/loginService');

const login = async (req, res) => {
      const { email, password } = await loginService.validateBody(req.body);

      await loginService.validateCredentials({ email, password });
      
      res.status(200).end();
};
  
  module.exports = {
    login,
  };