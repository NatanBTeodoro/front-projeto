// paginas/paginasJSX/ConfirmacaoPedido.jsx

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TemplateAutenticado from '../../templates/templatesJSX/TemplateAutenticado';
import Titulo from '../../atomos/atomosJSX/Titulo';
import Texto from '../../atomos/atomosJSX/Texto';
import Preco from '../../atomos/atomosJSX/Preco';
import Botao from '../../atomos/atomosJSX/Botao';
import Divisor from '../../atomos/atomosJSX/Divisor';
import Label from '../../atomos/atomosJSX/Label';
import MensagemErro from '../../atomos/atomosJSX/MensagemErro';
import MensagemSucesso from '../../atomos/atomosJSX/MensagemSucesso';
import { apiFetch } from '../../../services/api';
import '../paginasCSS/ConfirmacaoPedido.css';

function ConfirmacaoPedido() {
  const location = useLocation();
  const navigate = useNavigate();
  const clienteId = Number(localStorage.getItem('clienteId'));
  const pedido = location.state?.pedido;

  const [modo, setModo] = useState('escolha');
  const [reclamacao, setReclamacao] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [enviando, setEnviando] = useState(false);

  function handleSair() {
    localStorage.removeItem('clienteId');
    localStorage.removeItem('clienteNome');
    window.location.href = '/login';
  }

  async function enviarConfirmacao(recebido) {
    setErro('');
    setEnviando(true);

    const response = await apiFetch(`/pedidos/${pedido.id}/confirmacao`, {
      method: 'PUT',
      body: JSON.stringify({
        clienteId,
        recebido,
        reclamacao: recebido ? null : reclamacao,
      }),
    });

    setEnviando(false);

    if (!response.ok) {
      const dados = await response.json().catch(() => ({}));
      setErro(dados.mensagem || 'Não foi possível registrar a confirmação.');
      return;
    }

    setSucesso(recebido
      ? 'Obrigado! Pedido confirmado como recebido.'
      : 'Sua reclamação foi registrada. A pizzaria será notificada.');
    setModo('concluido');
  }

  function handleConfirmarRecebido() {
    enviarConfirmacao(true);
  }

  function handleEnviarReclamacao() {
    if (!reclamacao.trim()) {
      setErro('Descreva o problema para registrar a reclamação.');
      return;
    }
    enviarConfirmacao(false);
  }

  if (!pedido) {
    return (
      <TemplateAutenticado rotaAtual="/pedido" onSair={handleSair}>
        <div className="confirmacao-pedido">
          <Texto conteudo="Nenhum pedido para exibir." cor="secundario" />
          <Botao texto="Voltar ao início" variante="primario" onClick={() => navigate('/')} />
        </div>
      </TemplateAutenticado>
    );
  }

  return (
    <TemplateAutenticado rotaAtual="/pedido" onSair={handleSair}>
      <div className="confirmacao-pedido">
        <Titulo texto="Pedido realizado!" nivel={1} centralizado />

        <section className="confirmacao-pedido__secao">
          <Titulo texto="Resumo do pedido" nivel={2} />
          {pedido.itens?.map((item) => (
            <div key={item.id} className="confirmacao-pedido__item">
              <Texto conteudo={`${item.quantidade}x ${item.nomeItem}`} />
              <Preco valor={item.valorUnitario * item.quantidade} />
            </div>
          ))}
          <Divisor margem="pequeno" />
          <div className="confirmacao-pedido__total">
            <Texto conteudo="Total:" />
            <Preco valor={pedido.valorTotal} destaque />
          </div>
        </section>

        <section className="confirmacao-pedido__secao">
          <Titulo texto="Endereço de entrega" nivel={2} />
          <Texto conteudo={pedido.enderecoEntrega} cor="secundario" />
        </section>

        {modo !== 'concluido' && (
          <section className="confirmacao-pedido__secao">
            <Titulo texto="Você recebeu o pedido?" nivel={2} />
            {modo === 'escolha' && (
              <div className="confirmacao-pedido__acoes">
                <Botao
                  texto="Recebido"
                  variante="primario"
                  larguraTotal
                  onClick={() => setModo('recebido')}
                />
                <Botao
                  texto="Não recebido"
                  variante="perigo"
                  larguraTotal
                  onClick={() => setModo('nao-recebido')}
                />
              </div>
            )}

            {modo === 'recebido' && (
              <div className="confirmacao-pedido__acoes">
                <Texto conteudo="Confirma que recebeu o pedido corretamente?" tamanho="pequeno" cor="secundario" />
                <Botao
                  texto={enviando ? 'Salvando...' : 'Confirmar recebimento'}
                  variante="primario"
                  larguraTotal
                  onClick={handleConfirmarRecebido}
                  desabilitado={enviando}
                />
                <Botao texto="Voltar" variante="secundario" larguraTotal onClick={() => setModo('escolha')} />
              </div>
            )}

            {modo === 'nao-recebido' && (
              <div className="confirmacao-pedido__reclamacao">
                <Label texto="Descreva o problema" htmlFor="reclamacao" obrigatorio />
                <textarea
                  id="reclamacao"
                  className="confirmacao-pedido__textarea"
                  rows={4}
                  placeholder="Ex: O pedido não chegou no endereço informado..."
                  value={reclamacao}
                  onChange={(e) => setReclamacao(e.target.value)}
                />
                <div className="confirmacao-pedido__acoes">
                  <Botao
                    texto={enviando ? 'Enviando...' : 'Enviar reclamação'}
                    variante="perigo"
                    larguraTotal
                    onClick={handleEnviarReclamacao}
                    desabilitado={enviando}
                  />
                  <Botao texto="Voltar" variante="secundario" larguraTotal onClick={() => setModo('escolha')} />
                </div>
              </div>
            )}

            {erro && <MensagemErro mensagem={erro} />}
          </section>
        )}

        {modo === 'concluido' && (
          <>
            <MensagemSucesso mensagem={sucesso} />
            <div className="confirmacao-pedido__acoes">
              <Botao texto="Ver meus pedidos" variante="primario" larguraTotal onClick={() => navigate('/meus-pedidos')} />
              <Botao texto="Voltar ao início" variante="secundario" larguraTotal onClick={() => navigate('/')} />
            </div>
          </>
        )}
      </div>
    </TemplateAutenticado>
  );
}

export default ConfirmacaoPedido;
