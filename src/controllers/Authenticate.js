// controllers/Authenticate.js
const jwt = require('jsonwebtoken');

class Authenticate {
  static checkAuth(req, res, next) {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, 'shopture', (err, decodedToken) => {
        if (err) {
          console.log('Token verification failed:', err.message);
          return res.status(401).json({ message: 'Unauthorized' });
        } else {
          req.user = decodedToken.id;
          console.log('Verified user:', decodedToken);
          next();
        }
      });
    } else {
      return res.status(401).json({ message: 'No token provided' });
    }
  }
}

module.exports = Authenticate;
