// atoms/Input/Input.jsx
//
// USO: Todos os campos de texto dos formulários: nome, CPF, CEP, usuário.
// NECESSIDADE: Padroniza aparência, foco e estado de erro de todos os inputs.
//
// PROPS:
//   id           (string)   — id do campo, conectado ao Label via htmlFor
//   tipo         (string)   — "text" | "number" | "email" (padrão: "text")
//   valor        (string)   — valor controlado pelo estado do pai
//   onChange     (function) — função chamada ao digitar
//   placeholder  (string)   — texto de exemplo dentro do campo
//   erro         (bool)     — borda vermelha quando true (padrão: false)
//   desabilitado (bool)     — campo somente leitura quando true (padrão: false)
//
// EXEMPLOS DE USO:
//   <Input id="nome" valor={nome} onChange={(e) => setNome(e.target.value)} placeholder="João Silva" />
//   <Input id="cpf"  valor={cpf}  onChange={(e) => setCpf(e.target.value)}  placeholder="000.000.000-00" erro={!!erros.cpf} />

import "../atomosCSS/Input.css";

function Input({
  id,
  tipo = "text",
  valor,
  onChange,
  placeholder = "",
  erro = false,
  desabilitado = false,
  autoComplete,
  inputMode,
}) {
  return (
    <input
      id={id}
      type={tipo}
      value={valor}
      onChange={onChange}
      placeholder={placeholder}
      disabled={desabilitado}
      autoComplete={autoComplete}
      inputMode={inputMode}
      className={`input ${erro ? "input--erro" : ""} ${desabilitado ? "input--desabilitado" : ""}`}
    />
  );
}

export default Input;
