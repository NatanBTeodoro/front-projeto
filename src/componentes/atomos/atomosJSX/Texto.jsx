// atoms/Texto/Texto.jsx
//
// USO: Parágrafos, descrições de pizzas, mensagens informativas, rodapé.
// NECESSIDADE: Garante fonte, tamanho e cor consistentes em todos os textos.
//
// PROPS:
//   conteudo (string) — texto a exibir
//   tamanho  (string) — "pequeno" | "normal" | "grande" (padrão: "normal")
//   cor      (string) — "principal" | "secundario" | "claro" (padrão: "principal")
//
// EXEMPLOS DE USO:
//   <Texto conteudo="Molho de tomate, mussarela e manjericão." />
//   <Texto conteudo="Criado por Natan 2026" tamanho="pequeno" cor="secundario" />

import "../atomosCSS/Texto.css";

function Texto({ conteudo, tamanho = "normal", cor = "principal" }) {
  return (
    <p className={`texto texto--${tamanho} texto--${cor}`}>
      {conteudo}
    </p>
  );
}

export default Texto;
