// atoms/Label/Label.jsx
//
// USO: Rótulo de cada campo nos formulários de cadastro, login e perfil.
// NECESSIDADE: Associa visualmente e semanticamente o texto ao campo via htmlFor.
//
// PROPS:
//   texto       (string) — texto exibido acima do campo
//   htmlFor     (string) — id do Input que este label descreve
//   obrigatorio (bool)   — exibe asterisco vermelho quando true (padrão: false)
//
// EXEMPLOS DE USO:
//   <Label texto="Nome completo" htmlFor="nome" obrigatorio />
//   <Label texto="CEP" htmlFor="cep" />

import "../atomosCSS/Label.css"

function Label({ texto, htmlFor, obrigatorio = false }) {
  return (
    <label htmlFor={htmlFor} className="label">
      {texto}
      {obrigatorio && <span className="label__obrigatorio">*</span>}
    </label>
  );
}

export default Label;
