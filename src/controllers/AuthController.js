const jwt = require('jsonwebtoken');
const User = require('../models/user');
const handleErrors = require('../utils/handleErrors');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, 'shopture', { expiresIn: maxAge });
};

class AuthController {
  static async SignMeUp(req, res) {
    const { email, password } = req.body;

    try {
      const newUser = await User.create({ email, password });
      const token = createToken(newUser._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ newUser: newUser._id });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  }

  static async LogMeIn(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  }
}

module.exports = AuthController;
