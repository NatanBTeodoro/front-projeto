// atoms/MensagemSucesso/MensagemSucesso.jsx
//
// USO: Confirmar ações concluídas com sucesso ao usuário.
// NECESSIDADE: Feedback positivo padronizado em toda a aplicação.
//
// PROPS:
//   mensagem (string) — texto de confirmação a exibir
//
// EXEMPLOS DE USO:
//   {sucesso && <MensagemSucesso mensagem="Cadastro realizado com sucesso!" />}
//   {sucesso && <MensagemSucesso mensagem="Senha alterada com sucesso!" />}

import "../atomosCSS/MensagemSucesso.css";

function MensagemSucesso({ mensagem }) {
  if (!mensagem) return null;

  return (
    <span role="status" className="mensagem-sucesso">
      ✅ {mensagem}
    </span>
  );
}

export default MensagemSucesso;
