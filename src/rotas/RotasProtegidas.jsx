// rotas/RotasProtegidas.jsx
//
// Guards simples para páginas que exigem autenticação de cliente ou admin.

import { Navigate } from 'react-router-dom';

export function RotaCliente({ children }) {
  const clienteId = localStorage.getItem('clienteId');
  if (!clienteId) return <Navigate to="/login" replace />;
  return children;
}

export function RotaAdmin({ children }) {
  if (localStorage.getItem('adminLogado') !== 'true') {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
