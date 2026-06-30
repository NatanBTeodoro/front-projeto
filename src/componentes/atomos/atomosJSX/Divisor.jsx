// atoms/Divisor/Divisor.jsx
//
// USO: Separar seções dentro de páginas, cards e formulários.
// NECESSIDADE: Linha horizontal consistente sem repetir border CSS em vários lugares.
//
// PROPS:
//   margem (string) — "pequeno" | "normal" | "grande" (padrão: "normal")
//
// EXEMPLOS DE USO:
//   <Divisor />
//   <Divisor margem="grande" />

import "../atomosCSS/Divisor.css";

function Divisor({ margem = "normal" }) {
  return <hr className={`divisor divisor--${margem}`} />;
}

export default Divisor;
