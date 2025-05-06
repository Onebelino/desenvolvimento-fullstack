const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const { generateToken } = require('../middleware/auth');

// Registrar novo usuário
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Preencha todos os campos.' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const novoUsuario = await Usuario.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'Usuário registrado com sucesso', usuario: novoUsuario });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

// Login de usuário
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const token = generateToken(usuario);
    res.status(200).json({ message: 'Login realizado com sucesso', usuario, token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

// Obter todos os usuários
const getAll = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

// Obter usuário por ID
const getById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

// Atualizar usuário
const update = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (password) {
      usuario.password = bcrypt.hashSync(password, 10);
    }
    usuario.name = name || usuario.name;
    usuario.email = email || usuario.email;

    await usuario.save();
    res.status(200).json({ message: 'Usuário atualizado com sucesso', usuario });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

// Excluir usuário
const remove = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await usuario.destroy();
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

module.exports = {
  register,
  login,
  getAll,
  getById,
  update,
  remove
};