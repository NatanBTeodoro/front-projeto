// paginas/paginasJSX/AdminClientes.jsx

import { useState, useEffect } from 'react';
import TemplateAdmin from '../../templates/templatesJSX/TemplateAdmin';
import Titulo from '../../atomos/atomosJSX/Titulo';
import Texto from '../../atomos/atomosJSX/Texto';
import Botao from '../../atomos/atomosJSX/Botao';
import Divisor from '../../atomos/atomosJSX/Divisor';
import CardPedidoAdmin from '../../organismos/organismosJSX/CardPedidoAdmin';
import { apiJson } from '../../../services/api';
import { formatarCpfExibicao } from '../../../utils/formatacao';
import '../paginasCSS/AdminClientes.css';

const ROTULO_LABEL = { CASA: 'Casa', TRABALHO: 'Trabalho', OUTRO: 'Outro' };

function formatarEndereco(endereco) {
  let texto = '';
  if (endereco.rotulo === 'OUTRO' && endereco.nomePersonalizado) {
    texto = `${endereco.nomePersonalizado} — `;
  } else if (endereco.rotulo) {
    texto = `${ROTULO_LABEL[endereco.rotulo] || endereco.rotulo} — `;
  }
  texto += `${endereco.rua}, ${endereco.numero} — ${endereco.bairro}, ${endereco.cidade}`;
  if (endereco.cep) texto += ` — CEP: ${endereco.cep}`;
  if (endereco.principal) texto += ' (Principal)';
  return texto;
}

function AdminClientes() {
  const [clientes, setClientes] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [enderecos, setEnderecos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [logs, setLogs] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    apiJson('/clientes').then(setClientes);
  }, []);

  async function verDetalhes(cliente) {
    setSelecionado(cliente);
    const [listaEnderecos, listaPedidos, listaLogs] = await Promise.all([
      apiJson(`/clientes/${cliente.id}/enderecos`),
      apiJson(`/pedidos/cliente/${cliente.id}`),
      apiJson(`/admin/clientes/${cliente.id}/logs`),
    ]);
    setEnderecos(listaEnderecos);
    setPedidos(listaPedidos);
    setLogs(listaLogs);
  }

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nomeCompleto.toLowerCase().includes(busca.toLowerCase()) ||
      c.cpf.includes(busca)
  );

  function handleSair() {
    localStorage.removeItem('adminLogado');
    window.location.href = '/admin/login';
  }

  return (
    <TemplateAdmin rotaAtual="/admin/clientes" onSair={handleSair}>
      <div className="admin-clientes">
        <div className="admin-clientes__cabecalho aviso-claro">
          <Titulo texto="Clientes" nivel={1} />
          <div className="admin-clientes__busca-campo">
            <label className="admin-clientes__label" htmlFor="buscaClientes">Buscar:</label>
            <input
              id="buscaClientes"
              className="admin-clientes__busca"
              placeholder="Nome ou CPF..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-clientes__conteudo">

          <div className="admin-clientes__lista">
            {clientesFiltrados.map((c) => (
              <div
                key={c.id}
                className={`admin-clientes__item ${selecionado?.id === c.id ? 'admin-clientes__item--selecionado' : ''} ${c.ativo === false ? 'admin-clientes__item--deletado' : ''}`}
                onClick={() => verDetalhes(c)}
              >
                <div className="admin-clientes__item-linha">
                  <Texto conteudo={c.nomeCompleto} />
                  <span className={`admin-clientes__status admin-clientes__status--${c.ativo === false ? 'deletado' : 'ativo'}`}>
                    {c.ativo === false ? 'Deletado' : 'Ativo'}
                  </span>
                </div>
                <Texto conteudo={formatarCpfExibicao(c.cpf)} tamanho="pequeno" cor="secundario" />
              </div>
            ))}
          </div>

          {selecionado && (
            <div className="admin-clientes__detalhe">
              <div className="admin-clientes__detalhe-cabecalho">
                <Titulo texto={selecionado.nomeCompleto} nivel={2} />
                <span className={`admin-clientes__status admin-clientes__status--${selecionado.ativo === false ? 'deletado' : 'ativo'}`}>
                  {selecionado.ativo === false ? 'Deletado' : 'Ativo'}
                </span>
              </div>
              <Texto conteudo={`CPF: ${formatarCpfExibicao(selecionado.cpf)}`} />
              <Texto conteudo={`Usuário: ${selecionado.usuario}`} />
              <Texto conteudo={`Cadastrado em: ${new Date(selecionado.dataCadastro).toLocaleDateString('pt-BR')}`} tamanho="pequeno" cor="secundario" />
              {selecionado.ativo === false && selecionado.dataExclusao && (
                <Texto
                  conteudo={`Excluído em: ${new Date(selecionado.dataExclusao).toLocaleString('pt-BR')}`}
                  tamanho="pequeno"
                  cor="secundario"
                />
              )}

              <Divisor />

              <Titulo texto="Endereços" nivel={3} />
              {enderecos.length === 0 ? (
                <Texto conteudo="Nenhum endereço cadastrado." cor="secundario" tamanho="pequeno" />
              ) : (
                enderecos.map((end) => (
                  <Texto key={end.id} conteudo={formatarEndereco(end)} tamanho="pequeno" />
                ))
              )}

              <Divisor />

              <Titulo texto="Pedidos" nivel={3} />
              {pedidos.length === 0 ? (
                <div className="aviso-claro">
                  <Texto conteudo="Nenhum pedido realizado." tamanho="pequeno" />
                </div>
              ) : (
                <div className="admin-clientes__pedidos">
                  {pedidos.map((pedido) => (
                    <CardPedidoAdmin key={pedido.id} pedido={pedido} exibirNomeCliente={false} />
                  ))}
                </div>
              )}

              <Divisor />

              <Titulo texto="Histórico de alterações" nivel={3} />
              {logs.length === 0 ? (
                <Texto conteudo="Nenhuma alteração registrada." cor="secundario" />
              ) : (
                logs.map((log) => (
                  <Texto
                    key={log.id}
                    conteudo={`${log.campoAlterado} — ${new Date(log.dataHora).toLocaleString('pt-BR')}`}
                    tamanho="pequeno"
                    cor="secundario"
                  />
                ))
              )}

              <Divisor margem="pequeno" />
              <Botao texto="Fechar" variante="secundario" onClick={() => { setSelecionado(null); setPedidos([]); }} />
            </div>
          )}

        </div>
      </div>
    </TemplateAdmin>
  );
}

export default AdminClientes;
