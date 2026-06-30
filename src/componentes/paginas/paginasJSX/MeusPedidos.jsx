// paginas/paginasJSX/MeusPedidos.jsx

import { useState, useEffect } from 'react';
import TemplateAutenticado from '../../templates/templatesJSX/TemplateAutenticado';
import Titulo from '../../atomos/atomosJSX/Titulo';
import Texto from '../../atomos/atomosJSX/Texto';
import Preco from '../../atomos/atomosJSX/Preco';
import Divisor from '../../atomos/atomosJSX/Divisor';
import { apiJson } from '../../../services/api';
import '../paginasCSS/MeusPedidos.css';

const STATUS_LABEL = {
  PENDENTE: 'Pendente',
  EM_PREPARO: 'Em preparo',
  A_CAMINHO: 'A caminho',
  ENTREGUE: 'Entregue',
  NAO_RECEBIDO: 'Não recebido',
};

const CONFIRMACAO_LABEL = {
  AGUARDANDO: 'Aguardando confirmação',
  RECEBIDO: 'Recebido pelo cliente',
  NAO_RECEBIDO: 'Não recebido',
};

function MeusPedidos() {
  const clienteId = localStorage.getItem('clienteId');
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    apiJson(`/pedidos/cliente/${clienteId}`).then(setPedidos);
  }, [clienteId]);

  function handleSair() {
    localStorage.removeItem('clienteId');
    localStorage.removeItem('clienteNome');
    window.location.href = '/login';
  }

  return (
    <TemplateAutenticado rotaAtual="/meus-pedidos" onSair={handleSair}>
      <div className="meus-pedidos">
        <Titulo texto="Meus Pedidos" nivel={1} />

        {pedidos.length === 0 ? (
          <div className="aviso-claro">
            <Texto conteudo="Você ainda não realizou nenhum pedido." />
          </div>
        ) : (
          <div className="meus-pedidos__lista">
            {pedidos.map((pedido) => (
              <article key={pedido.id} className="meus-pedidos__card">
                <div className="meus-pedidos__cabecalho">
                  <Texto conteudo={`Pedido #${pedido.id}`} />
                  <span className={`meus-pedidos__status meus-pedidos__status--${pedido.status?.toLowerCase()}`}>
                    {STATUS_LABEL[pedido.status] || pedido.status}
                  </span>
                </div>
                <Texto
                  conteudo={new Date(pedido.dataHora).toLocaleString('pt-BR')}
                  tamanho="pequeno"
                  cor="secundario"
                />
                {pedido.enderecoEntrega && (
                  <Texto conteudo={`Entrega: ${pedido.enderecoEntrega}`} tamanho="pequeno" cor="secundario" />
                )}
                <Divisor margem="pequeno" />
                {pedido.itens?.map((item) => (
                  <Texto
                    key={item.id}
                    conteudo={`${item.quantidade}x ${item.nomeItem}`}
                    tamanho="pequeno"
                  />
                ))}
                <div className="meus-pedidos__total">
                  <Preco valor={pedido.valorTotal} destaque />
                </div>
                {pedido.confirmacaoRecebimento && pedido.confirmacaoRecebimento !== 'AGUARDANDO' && (
                  <div className="meus-pedidos__historico">
                    <Texto
                      conteudo={`Confirmação: ${CONFIRMACAO_LABEL[pedido.confirmacaoRecebimento] || pedido.confirmacaoRecebimento}`}
                      tamanho="pequeno"
                    />
                    {pedido.reclamacao && (
                      <div className="meus-pedidos__reclamacao aviso-claro">
                        <Texto conteudo={`Reclamação: ${pedido.reclamacao}`} tamanho="pequeno" />
                      </div>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </TemplateAutenticado>
  );
}

export default MeusPedidos;
