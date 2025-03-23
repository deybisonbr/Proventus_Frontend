import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      setIsAuthenticated(false); 
    } else {

      fetch(`${import.meta.env.VITE_API_URL}/auth/validate-token`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setIsAuthenticated(true); 
          } else {
            setIsAuthenticated(false); 
          }
        })
        .catch(() => {
          setIsAuthenticated(false); 
        });
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Exibe algo enquanto valida
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />; 
  }

  return children; // Se estiver autenticado, renderiza a rota
};

export default PrivateRoute;
