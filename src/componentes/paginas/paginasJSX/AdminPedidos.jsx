// paginas/paginasJSX/AdminPedidos.jsx

import { useState, useEffect } from 'react';
import TemplateAdmin from '../../templates/templatesJSX/TemplateAdmin';
import Titulo from '../../atomos/atomosJSX/Titulo';
import Texto from '../../atomos/atomosJSX/Texto';
import CardPedidoAdmin from '../../organismos/organismosJSX/CardPedidoAdmin';
import { apiJson } from '../../../services/api';
import '../paginasCSS/AdminPedidos.css';

function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [filtroData, setFiltroData] = useState('');

  useEffect(() => {
    apiJson('/pedidos').then(setPedidos);
  }, []);

  const pedidosFiltrados = filtroData
    ? pedidos.filter((p) => new Date(p.dataHora).toLocaleDateString('pt-BR') === new Date(filtroData).toLocaleDateString('pt-BR'))
    : pedidos;

  function handleSair() {
    localStorage.removeItem('adminLogado');
    window.location.href = '/admin/login';
  }

  return (
    <TemplateAdmin rotaAtual="/admin/pedidos" onSair={handleSair}>
      <div className="admin-pedidos">
        <div className="admin-pedidos__cabecalho aviso-claro">
          <Titulo texto="Pedidos" nivel={1} />
          <div className="admin-pedidos__filtro">
            <label className="admin-pedidos__label" htmlFor="filtroData">Filtrar por data:</label>
            <input
              id="filtroData"
              type="date"
              className="admin-pedidos__input-data"
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-pedidos__lista">
          {pedidosFiltrados.length === 0 ? (
            <div className="aviso-claro">
              <Texto conteudo="Nenhum pedido encontrado." />
            </div>
          ) : (
            pedidosFiltrados.map((pedido) => (
              <CardPedidoAdmin key={pedido.id} pedido={pedido} />
            ))
          )}
        </div>
      </div>
    </TemplateAdmin>
  );
}

export default AdminPedidos;
