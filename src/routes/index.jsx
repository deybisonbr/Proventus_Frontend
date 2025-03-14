import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard'; // Exemplo de dashboard
import PrivateRoute from './PrivateRoute'; // Importando o PrivateRoute

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Rota pública */}
      <Route path="/" element={<Login />} />
      
      {/* Rotas protegidas */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard /> {/* Página do Dashboard */}
          </PrivateRoute>
        }
      />
      
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile /> {/* Página de Perfil */}
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
