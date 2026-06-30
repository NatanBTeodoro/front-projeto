// moleculas/moleculasJSX/ItemPedido.jsx
//
// USO: Cada linha do resumo do pedido mostrando item adicionado, quantidade e subtotal.
// NECESSIDADE: Representa um item já adicionado ao carrinho antes de confirmar o pedido.
//              Reutilizado para cada pizza ou bebida no resumo.
//
// PROPS:
//   nome          (string)   — nome da pizza ou bebida
//   quantidade    (number)   — quantidade adicionada
//   valorUnitario (number)   — preço unitário do item
//   onRemover     (function) — remove uma unidade do item ao clicar em "−"
//
// EXEMPLOS DE USO:
//   <ItemPedido nome="Margherita" quantidade={2} valorUnitario={32.90} onRemover={() => removerItem(id)} />
//   <ItemPedido nome="Coca-Cola"  quantidade={1} valorUnitario={7.00}  onRemover={() => removerItem(id)} />

import Texto from '../../atomos/atomosJSX/Texto';
import Preco from '../../atomos/atomosJSX/Preco';
import Botao from '../../atomos/atomosJSX/Botao';
import '../moleculasCSS/ItemPedido.css';

function ItemPedido({ nome, quantidade, valorUnitario, onRemover }) {
  const subtotal = quantidade * valorUnitario;

  return (
    <div className="item-pedido">
      <div className="item-pedido__info">
        <Texto conteudo={nome} />
        <Texto conteudo={`x${quantidade}`} tamanho="pequeno" cor="secundario" />
      </div>
      <div className="item-pedido__preco">
        <Preco valor={subtotal} />
        <Botao texto="−" variante="perigo" onClick={onRemover} />
      </div>
    </div>
  );
}

export default ItemPedido;
