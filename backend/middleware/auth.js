const jwt = require('jsonwebtoken');
const SECRET = 'seusegredoaqui';

exports.generateToken = (usuario) => {
  return jwt.sign({ id: usuario.id, email: usuario.email }, SECRET, { expiresIn: '1h' });
};

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};
