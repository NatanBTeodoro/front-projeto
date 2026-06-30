// atoms/BotaoAdicionar/BotaoAdicionar.jsx
//
// USO: Botão "+" nos cards de pizza e bebida para adicionar itens ao pedido.
// NECESSIDADE: Caso específico do Botao com formato circular e ícone fixo.
//              Reutiliza Botao internamente sobrescrevendo apenas o estilo visual via CSS.
//
// PROPS:
//   onClick (function) — função chamada ao clicar, adiciona o item ao pedido
//
// EXEMPLOS DE USO:
//   <BotaoAdicionar onClick={() => adicionarItem(pizza)} />
//   <BotaoAdicionar onClick={() => adicionarItem(bebida)} />

import Botao from "./Botao";
import "../atomosCSS/BotaoAdicionar.css";

function BotaoAdicionar({ onClick }) {
  return (
    <div className="botao-adicionar">
      <Botao texto="+" onClick={onClick} variante="primario" aria-label="Adicionar ao pedido" />
    </div>
  );
}

export default BotaoAdicionar;
