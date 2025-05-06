const express = require('express');
const router = express.Router();
const {register, getAll, getById, login, remove, update} = require('../controllers/usuarioController');
const { authMiddleware } = require('../middleware/auth');

// Registrar novo usuário
router.post('/register', register);

// Login de usuário
router.post('/login', login);

// Obter todos os usuários
router.get('/dashboard', getAll);

// Obter usuário por ID
router.get('/:id', getById);

// Atualizar usuário por ID
router.put('/:id', update);

// Excluir usuário por ID
router.delete('/:id', remove);

module.exports = router;
