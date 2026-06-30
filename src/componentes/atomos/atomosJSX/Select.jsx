// atoms/Select/Select.jsx
//
// USO: Dropdown para selecionar o rótulo do endereço (CASA, TRABALHO, OUTRO).
// NECESSIDADE: Padroniza o <select> para combinar visualmente com os Inputs.
//
// PROPS:
//   id       (string)   — id do campo, conectado ao Label via htmlFor
//   valor    (string)   — valor selecionado controlado pelo estado do pai
//   onChange (function) — função chamada ao selecionar uma opção
//   opcoes   (array)    — lista de { valor, label } para montar as opções
//   erro     (bool)     — borda vermelha quando true (padrão: false)
//
// EXEMPLOS DE USO:
//   <Select
//     id="rotulo"
//     valor={rotulo}
//     onChange={(e) => setRotulo(e.target.value)}
//     opcoes={[
//       { valor: "CASA",     label: "🏠 Casa" },
//       { valor: "TRABALHO", label: "💼 Trabalho" },
//       { valor: "OUTRO",    label: "✏️ Outro" },
//     ]}
//   />

import "../atomosCSS/Select.css";

function Select({ id, valor, onChange, opcoes = [], erro = false }) {
  return (
    <select
      id={id}
      value={valor}
      onChange={onChange}
      className={`select ${erro ? "select--erro" : ""}`}
    >
      <option value="" disabled>Selecione...</option>
      {opcoes.map((op) => (
        <option key={op.valor} value={op.valor}>
          {op.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
