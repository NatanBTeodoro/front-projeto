// atoms/MensagemErro/MensagemErro.jsx
//
// USO: Exibir erros de validação abaixo dos campos de formulário.
// NECESSIDADE: Centraliza cor, ícone e tamanho de todos os erros da aplicação.
//
// PROPS:
//   mensagem (string) — texto do erro a exibir
//
// EXEMPLOS DE USO:
//   {erros.cpf   && <MensagemErro mensagem="CPF já cadastrado." />}
//   {erros.senha && <MensagemErro mensagem="A senha deve ter no mínimo 6 caracteres." />}

import "../atomosCSS/MensagemErro.css";

function MensagemErro({ mensagem }) {
  if (!mensagem) return null;

  return (
    <span role="alert" className="mensagem-erro">
      {mensagem}
    </span>
  );
}

export default MensagemErro;
