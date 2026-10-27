import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './componentes/paginas/paginasJSX/Home';
import Cadastro from './componentes/paginas/paginasJSX/Cadastro';
import Login from './componentes/paginas/paginasJSX/Login';
import EsqueciSenha from './componentes/paginas/paginasJSX/EsqueciSenha';
import Perfil from './componentes/paginas/paginasJSX/Perfil';
import Pedido from './componentes/paginas/paginasJSX/Pedido';
import MeusPedidos from './componentes/paginas/paginasJSX/MeusPedidos';
import ConfirmacaoPedido from './componentes/paginas/paginasJSX/ConfirmacaoPedido';
import AdminLogin from './componentes/paginas/paginasJSX/AdminLogin';
import AdminEsqueciSenha from './componentes/paginas/paginasJSX/AdminEsqueciSenha';
import AdminDashboard from './componentes/paginas/paginasJSX/AdminDashboard';
import AdminCardapio from './componentes/paginas/paginasJSX/AdminCardapio';
import AdminClientes from './componentes/paginas/paginasJSX/AdminClientes';
import AdminPedidos from './componentes/paginas/paginasJSX/AdminPedidos';
import { RotaCliente, RotaAdmin } from './rotas/RotasProtegidas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Cliente */}
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/perfil" element={<RotaCliente><Perfil /></RotaCliente>} />
        <Route path="/pedido" element={<RotaCliente><Pedido /></RotaCliente>} />
        <Route path="/pedido/confirmacao" element={<RotaCliente><ConfirmacaoPedido /></RotaCliente>} />
        <Route path="/meus-pedidos" element={<RotaCliente><MeusPedidos /></RotaCliente>} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/esqueci-senha" element={<AdminEsqueciSenha />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/dashboard" element={<RotaAdmin><AdminDashboard /></RotaAdmin>} />
        <Route path="/admin/cardapio" element={<RotaAdmin><AdminCardapio /></RotaAdmin>} />
        <Route path="/admin/clientes" element={<RotaAdmin><AdminClientes /></RotaAdmin>} />
        <Route path="/admin/pedidos" element={<RotaAdmin><AdminPedidos /></RotaAdmin>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
