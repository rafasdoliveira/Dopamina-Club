import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Empresas from './pages/cadastro/empresas/cadastroEmpresas';
import Usuarios from './pages/cadastro/usuarios/cadastroUsuario.jsx';
import Login from './pages/login/login.jsx';
import TipoConta from './pages/cadastro/tipoDeConta/tipoConta.jsx';
import Dashboard from './pages/dashboard/dashboard.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cadastroempresa" element={<Empresas />} />
        <Route path="/cadastrousuario" element={<Usuarios />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tipoconta" element={<TipoConta />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
