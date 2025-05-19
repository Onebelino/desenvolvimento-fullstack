import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    setMensagem('');
    setIsError(false);

    if (!name || !email || !password) {
      setMensagem('Preencha todos os campos.');
      setIsError(true);
      return;
    }

    if (!validarEmail(email)) {
      setMensagem('E-mail inválido.');
      setIsError(true);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/usuarios/register', {
        name,
        email,
        password,
      });

      setMensagem(res.data.message);
      setIsError(false);
      setName('');
      setEmail('');
      setPassword('');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      setMensagem(error.response?.data?.message || 'Erro ao registrar');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Cadastro de Usuário</h1>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <button onClick={handleRegister} disabled={loading} className="btn">
        {loading ? 'Cadastrando...' : 'Cadastrar'}
      </button>


      <p className="text-link">
        Já tem uma conta? <Link to="/login">Clique aqui para fazer login.</Link>
      </p>

      {mensagem && (
        <p className={isError ? 'error-message' : 'success-message'}>
          {mensagem}
        </p>
      )}
    </div>
  );
};

export default Register;
