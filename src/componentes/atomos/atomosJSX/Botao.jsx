// atoms/Botao/Botao.jsx
//
// USO: Todos os botões da aplicação — cadastrar, entrar, pedir, cancelar, salvar.
// NECESSIDADE: Um único átomo cobre todos os casos variando variante e cor.
//
// PROPS:
//   texto        (string)   — texto exibido no botão
//   onClick      (function) — ação ao clicar
//   variante     (string)   — "primario" | "perigo" | "secundario" | "fantasma" (padrão: "primario")
//   tipo         (string)   — "button" | "submit" (padrão: "button")
//   larguraTotal (bool)     — ocupa 100% da largura quando true (padrão: false)
//   desabilitado (bool)     — desabilita o botão quando true (padrão: false)
//
// VARIANTES:
//   primario   — verde  → "Pedir", "Cadastrar", "Salvar"
//   perigo     — vermelho → "Cancelar", "Remover"
//   secundario — cinza  → ações neutras
//   fantasma   — transparente com borda → ações secundárias
//
// EXEMPLOS DE USO:
//   <Botao texto="Pedir" variante="primario" onClick={handlePedir} larguraTotal />
//   <Botao texto="Cancelar" variante="perigo" onClick={handleCancelar} />

import "../atomosCSS/Botao.css";

function Botao({
  texto,
  onClick,
  variante = "primario",
  tipo = "button",
  larguraTotal = false,
  desabilitado = false,
}) {
  return (
    <button
      type={tipo}
      onClick={onClick}
      disabled={desabilitado}
      className={`botao botao--${variante} ${larguraTotal ? "botao--largura-total" : ""} ${desabilitado ? "botao--desabilitado" : ""}`}
    >
      {texto}
    </button>
  );
}

export default Botao;
