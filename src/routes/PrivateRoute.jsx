import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Estado para verificar se está autenticado

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Ou localStorage, dependendo de onde está salvando

    if (!token) {
      setIsAuthenticated(false); // Se não tiver token, o usuário não está autenticado
    } else {

      fetch(`${import.meta.env.VITE_API_URL}/auth/validate-token`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setIsAuthenticated(true); // Token é válido
          } else {
            setIsAuthenticated(false); // Token inválido
          }
        })
        .catch(() => {
          setIsAuthenticated(false); // Caso haja erro na requisição
        });
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Exibe algo enquanto valida
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Se não estiver autenticado, redireciona para a página de login
  }

  return children; // Se estiver autenticado, renderiza a rota
};

export default PrivateRoute;
