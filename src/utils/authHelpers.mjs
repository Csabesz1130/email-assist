import jwt from 'jsonwebtoken';

// Use process.env to store the secret key
const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key_here';

export const generateToken = (user) => {
  const payload = { userId: user.id, email: user.email };
  const options = { expiresIn: '1h' };

  try {
    return jwt.sign(payload, secretKey, options);
  } catch (error) {
    throw new Error('Error generating token: ' + error.message);
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const tokenStart = authHeader.indexOf('Bearer ') + 'Bearer '.length;
  const token = authHeader.substring(tokenStart);

  if (!token) {
    return res.status(401).json({ error: 'Invalid token format' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.userId = decoded.userId;
  next();
};
