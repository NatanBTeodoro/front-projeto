// paginas/paginasJSX/AdminDashboard.jsx

import { useState, useEffect } from 'react';
import TemplateAdmin from '../../templates/templatesJSX/TemplateAdmin';
import Titulo from '../../atomos/atomosJSX/Titulo';
import Texto from '../../atomos/atomosJSX/Texto';
import { apiJson } from '../../../services/api';
import '../paginasCSS/AdminDashboard.css';

function AdminDashboard() {
  const [resumo, setResumo] = useState({ totalClientes: 0, totalPedidos: 0, pedidosHoje: 0 });

  useEffect(() => {
    apiJson('/admin/dashboard').then(setResumo);
  }, []);

  function handleSair() {
    localStorage.removeItem('adminLogado');
    window.location.href = '/admin/login';
  }

  const cards = [
    { titulo: 'Clientes cadastrados', valor: resumo.totalClientes },
    { titulo: 'Total de pedidos',     valor: resumo.totalPedidos  },
    { titulo: 'Pedidos hoje',         valor: resumo.pedidosHoje   },
  ];

  return (
    <TemplateAdmin rotaAtual="/admin/dashboard" onSair={handleSair}>
      <div className="admin-dashboard">
        <Titulo texto="Dashboard" nivel={1} />
        <div className="admin-dashboard__cards">
          {cards.map((card) => (
            <div key={card.titulo} className="admin-dashboard__card">
              <Texto conteudo={card.titulo} cor="secundario" tamanho="pequeno" />
              <span className="admin-dashboard__numero">{card.valor}</span>
            </div>
          ))}
        </div>
      </div>
    </TemplateAdmin>
  );
}

export default AdminDashboard;
