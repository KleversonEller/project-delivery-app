const { StatusCodes } = require('http-status-codes');
const { users: usersModel } = require('../database/models/index');
const { encryptPassword } = require('../utils/md5');
const { createToken } = require('../utils/jwt');
const throwMyError = require('../utils/throwMyError');
const LoginValidate = require('../validations/loginValidate');

class UserService {
  constructor(model = usersModel) {
    this.model = model;
  }

  async create(user) {
    LoginValidate.validateCredentials(user);
  
    const { password } = user;
    const passwordHash = encryptPassword(password);
  
    if (await this.model.findOne({ where: { email: user.email } })) {
      throwMyError(StatusCodes.CONFLICT, 'O usuário já possui cadastro');
    }

    const newUser = await this.model.create({ ...user, password: passwordHash, role: 'customer' });
    
    const token = createToken(newUser.dataValues);

    return { token, ...newUser.dataValues };
  }
  
  async getAll(role) {
    const result = await this.model.findAll({
      where: { role },
    });

    return result;
  }
}

module.exports = new UserService();