// moleculas/moleculasJSX/FormFieldSenha.jsx
//
// USO: Versão do FormField específica para campos de senha.
//      Usado no cadastro (senha + confirmar senha) e edição de perfil.
// NECESSIDADE: O InputSenha tem comportamento diferente do Input comum
//              (botão mostrar/esconder), então merece uma molécula própria.
//
// PROPS:
//   id          (string)   — conecta Label ao InputSenha via htmlFor/id
//   label       (string)   — texto do Label
//   valor       (string)   — valor controlado do InputSenha
//   onChange    (function) — função ao digitar
//   erro        (string)   — mensagem de erro; exibe MensagemErro quando preenchido
//   obrigatorio (bool)     — asterisco no Label quando true (padrão: false)
//
// EXEMPLOS DE USO:
//   <FormFieldSenha id="senha" label="Senha" valor={senha} onChange={(e) => setSenha(e.target.value)} obrigatorio />
//   <FormFieldSenha id="confirmar" label="Confirmar senha" valor={confirmar} onChange={(e) => setConfirmar(e.target.value)} erro={erros.senha} />

import Label from '../../atomos/atomosJSX/Label';
import InputSenha from '../../atomos/atomosJSX/InputSenha';
import MensagemErro from '../../atomos/atomosJSX/MensagemErro';
import '../moleculasCSS/FormFieldSenha.css';

function FormFieldSenha({
  id,
  label,
  valor,
  onChange,
  erro = '',
  obrigatorio = false,
}) {
  return (
    <div className="form-field-senha">
      <Label texto={label} htmlFor={id} obrigatorio={obrigatorio} />
      <InputSenha id={id} valor={valor} onChange={onChange} erro={!!erro} />
      <MensagemErro mensagem={erro} />
    </div>
  );
}

export default FormFieldSenha;
