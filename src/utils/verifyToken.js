const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'shopture', (err, decodedToken) => {
      if (err) {
        console.log('Token verification error:', err.message);
        return res.status(401).json({ message: 'Unauthorized' });
      } else {
        req.user = decodedToken.id;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = { requireAuth };
