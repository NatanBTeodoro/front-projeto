// organismos/organismosJSX/ResumoPedido.jsx
//
// USO: Seção de resumo do pedido com itens adicionados, total e botões de ação.
// NECESSIDADE: Centraliza o estado do carrinho — lista de itens, cálculo do total,
//              botão "Pedir" (verde) e botão "Cancelar" (vermelho).
//
// PROPS:
//   itens      (array)    — lista de { id, nome, quantidade, valorUnitario }
//   onRemover  (function) — chamada com o id do item ao clicar em "−"
//   onPedir    (function) — chamada ao confirmar o pedido
//   onCancelar (function) — chamada ao cancelar e limpar o pedido
//
// EXEMPLOS DE USO:
//   <ResumoPedido itens={itens} onRemover={removerItem} onPedir={handlePedir} onCancelar={handleCancelar} />

import { useState, useEffect } from 'react';
import ItemPedido from '../../moleculas/moleculasJSX/ItemPedido';
import Botao from '../../atomos/atomosJSX/Botao';
import Titulo from '../../atomos/atomosJSX/Titulo';
import Preco from '../../atomos/atomosJSX/Preco';
import Divisor from '../../atomos/atomosJSX/Divisor';
import Texto from '../../atomos/atomosJSX/Texto';
import '../organismosCSS/ResumoPedido.css';

function ResumoPedido({ itens = [], onRemover, onPedir, onCancelar }) {
  const [confirmarPedido, setConfirmarPedido] = useState(false);

  useEffect(() => {
    setConfirmarPedido(false);
  }, [itens]);

  const total = itens.reduce(
    (acc, item) => acc + item.quantidade * (item.valorUnitario ?? item.valor),
    0
  );

  return (
    <div className="resumo-pedido">
      <Titulo texto="Resumo do Pedido" nivel={2} />
      <Divisor margem="pequeno" />

      {itens.length === 0 ? (
        <Texto conteudo="Nenhum item adicionado ainda." cor="secundario" />
      ) : (
        <div className="resumo-pedido__itens">
          {itens.map((item) => (
            <ItemPedido
              key={`${item.tipo || 'item'}-${item.id}`}
              nome={item.nome}
              quantidade={item.quantidade}
              valorUnitario={item.valorUnitario ?? item.valor}
              onRemover={() => onRemover(item.id)}
            />
          ))}
        </div>
      )}

      <Divisor margem="pequeno" />
      <div className="resumo-pedido__total">
        <Texto conteudo="Total:" />
        <Preco valor={total} destaque />
      </div>

      <div className="resumo-pedido__acoes">
        {!confirmarPedido ? (
          <Botao
            texto="Pedir"
            variante="primario"
            larguraTotal
            onClick={() => setConfirmarPedido(true)}
            desabilitado={itens.length === 0}
          />
        ) : (
          <div className="resumo-pedido__confirmacao">
            <div className="aviso-claro">
              <Texto conteudo="Você tem certeza?" />
            </div>
            <div className="resumo-pedido__confirmacao-acoes">
              <Botao
                texto="Sim, confirmar pedido"
                variante="primario"
                larguraTotal
                onClick={() => {
                  setConfirmarPedido(false);
                  onPedir();
                }}
              />
              <Botao
                texto="Não, voltar"
                variante="secundario"
                larguraTotal
                onClick={() => setConfirmarPedido(false)}
              />
            </div>
          </div>
        )}
        <Botao texto="Cancelar" variante="perigo" larguraTotal onClick={onCancelar} desabilitado={itens.length === 0} />
      </div>
    </div>
  );
}

export default ResumoPedido;
