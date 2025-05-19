const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const { generateToken } = require('../middleware/auth');

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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const token = generateToken(usuario); // Gerando o token JWT
    res.status(200).json({ message: 'Login realizado com sucesso', usuario, token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

const getAll = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

const getById = async (req, res) => {
  res.status(501).send({ message: 'getById não implementado ainda' });
};

const update = async (req, res) => {
  res.status(501).send({ message: 'update não implementado ainda' });
};


const remove = async (req, res) => {
  try {
    const userId = req.usuario.id; 

    const usuario = await Usuario.findByPk(userId);
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
  remove,
};
