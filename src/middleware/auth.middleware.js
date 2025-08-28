const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Check if header exists and has Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach user info (user_id, role)
    // if (req.user.role !== 'admin') {
    //   return res.status(403).json({ error: 'Access forbidden. Admins only.' });
    // }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
