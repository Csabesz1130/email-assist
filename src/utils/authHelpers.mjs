import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key_here';

export const generateToken = (user) => {
  return jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.userId = decoded.userId;
  next();
};