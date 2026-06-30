import Texto from '../../atomos/atomosJSX/Texto';
import Preco from '../../atomos/atomosJSX/Preco';
import Divisor from '../../atomos/atomosJSX/Divisor';
import '../organismosCSS/CardPedidoAdmin.css';

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

function CardPedidoAdmin({ pedido, exibirNomeCliente = true }) {
  const titulo = exibirNomeCliente
    ? `#${pedido.id} — ${pedido.clienteNome}`
    : `#${pedido.id}`;

  return (
    <div className="card-pedido-admin">
      <div className="card-pedido-admin__cabecalho">
        <div className="card-pedido-admin__titulo-linha">
          <Texto conteudo={titulo} />
          {exibirNomeCliente && pedido.clienteAtivo !== undefined && (
            <span
              className={`card-pedido-admin__conta-status card-pedido-admin__conta-status--${pedido.clienteAtivo ? 'ativo' : 'deletado'}`}
            >
              {pedido.clienteAtivo ? 'Ativo' : 'Deletado'}
            </span>
          )}
        </div>
        <span className={`card-pedido-admin__status card-pedido-admin__status--${pedido.status?.toLowerCase()}`}>
          {STATUS_LABEL[pedido.status] || pedido.status}
        </span>
        <Texto
          conteudo={new Date(pedido.dataHora).toLocaleString('pt-BR')}
          tamanho="pequeno"
          cor="secundario"
        />
      </div>
      {pedido.enderecoEntrega && (
        <Texto conteudo={`Entrega: ${pedido.enderecoEntrega}`} tamanho="pequeno" cor="secundario" />
      )}
      <Divisor margem="pequeno" />
      <div className="card-pedido-admin__itens">
        {pedido.itens.map((item) => (
          <div key={item.id} className="card-pedido-admin__item">
            <Texto conteudo={`${item.nomeItem} x${item.quantidade}`} tamanho="pequeno" />
            <Preco valor={item.quantidade * item.valorUnitario} />
          </div>
        ))}
      </div>
      <Divisor margem="pequeno" />
      <div className="card-pedido-admin__total">
        <Texto conteudo="Total:" />
        <Preco valor={pedido.valorTotal} destaque />
      </div>
      {pedido.confirmacaoRecebimento && (
        <div className="card-pedido-admin__historico">
          <Texto
            conteudo={`Confirmação: ${CONFIRMACAO_LABEL[pedido.confirmacaoRecebimento] || pedido.confirmacaoRecebimento}`}
            tamanho="pequeno"
          />
          {pedido.reclamacao && (
            <div className="card-pedido-admin__reclamacao aviso-claro">
              <Texto conteudo={`Reclamação do cliente: ${pedido.reclamacao}`} tamanho="pequeno" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CardPedidoAdmin;
