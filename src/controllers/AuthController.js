const jwt = require('jsonwebtoken');
const User = require('../models/User');
const handleErrors = require('../utils/handleErrors');

const maxAge = 3 * 24 * 60 * 60;


const createToken = (id)=>{
  return jwt.sign({id}, 'shopture', {expiresIn: maxAge})
}

class AuthController {
  static async SignMeUp(req, res) {
    const { email, password , fullName} = req.body;

    try {
      const newUser = await User.create({ email, password , fullName});
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

  static LogMeOut(req,res){
    res.cookie('jwt', '', {maxAge:1})
    res.status(200).json({message: 'Logged out successfully'})
  }

  static Authenticate(req,res){
    const token = req.cookies.jwt
    if (token) {
            jwt.verify(token, 'shopture', (err, decodedToken) => {
                if (err) {
                    console.log(err.message)
                    return 'Verification failed'
                }
                else {
                    console.log(decodedToken)
                    next()
                }
            })
        }
        else {
            return Error
        }
  }
}

module.exports = AuthController;
