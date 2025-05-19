import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get('http://localhost:3000/usuarios/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsuarios(res.data))
      .catch(() => {
        navigate('/login');
      });
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
  const confirmed = window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.');

  if (confirmed) {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:3000/usuarios/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      
      localStorage.removeItem('token');


      window.location.href = '/login';
    } catch (err) {
      alert('Erro ao excluir conta.');
      console.error(err);
    }
  }
};


  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout} className='btn' id="logout-button">Sair</button>
      <button onClick={handleDeleteAccount} className='btn' id="delete-button">
        Excluir conta
      </button>
      <ul className="user-card">
        {usuarios.map((u: any) => (
          <li key={u.id}>{u.name} - {u.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
