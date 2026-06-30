// atoms/Titulo/Titulo.jsx
//
// USO: Títulos de páginas e seções do sistema.
// NECESSIDADE: Padroniza tamanho, peso e cor de todos os títulos da aplicação.
//
// PROPS:
//   texto        (string) — conteúdo do título
//   nivel        (number) — 1 = página, 2 = seção, 3 = subseção (padrão: 1)
//   centralizado (bool)   — alinha ao centro quando true (padrão: false)
//
// EXEMPLOS DE USO:
//   <Titulo texto="Faça seu pedido" nivel={1} />
//   <Titulo texto="Pizzas" nivel={2} centralizado />

import "../atomosCSS/Titulo.css";

function Titulo({ texto, nivel = 1, centralizado = false }) {
  const Tag = `h${nivel}`;

  return (
    <Tag className={`titulo titulo--n${nivel} ${centralizado ? "titulo--centralizado" : ""}`}>
      {texto}
    </Tag>
  );
}

export default Titulo;
