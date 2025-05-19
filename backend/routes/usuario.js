const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const {
  register,
  login,
  getAll,
  getById,
  update,
  remove
} = require('../controllers/usuarioController');


router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', authMiddleware, getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/me', authMiddleware, remove);

module.exports = router;
