import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem('token'); // Ou localStorage.removeItem('token');
    navigate('/');
  }, [navigate]);

  return null;
};

export default Logout;
