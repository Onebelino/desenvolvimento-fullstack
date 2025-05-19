const express = require('express');
const cors = require('cors');
const db = require('./config/database');
const usuarioRoutes = require('./routes/usuario');

const app = express();
const PORT = 3000;

app.use(cors());              
app.use(express.json());
app.use('/usuarios', usuarioRoutes);

db.sync()
  .then(() => {
    console.log('Database conectado com sucesso');
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });
