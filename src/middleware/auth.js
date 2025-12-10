import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const requireAuth = (req, res, next) => {
  try {
    const token = req.headers.token || req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const payload = jwt.verify(token, config.jwtSecret);
    req.userid = payload.sub;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default requireAuth;
