// moleculas/moleculasJSX/FormFieldSelect.jsx
//
// USO: Versão do FormField para campos de seleção (dropdown).
//      Usado no formulário de endereço para selecionar o rótulo (CASA, TRABALHO, OUTRO).
// NECESSIDADE: O Select tem estilo próprio diferente do Input,
//              então merece uma molécula dedicada.
//
// PROPS:
//   id          (string)   — conecta Label ao Select via htmlFor/id
//   label       (string)   — texto do Label
//   valor       (string)   — valor selecionado controlado pelo pai
//   onChange    (function) — função ao selecionar
//   opcoes      (array)    — lista de { valor, label }
//   erro        (string)   — mensagem de erro quando preenchido
//   obrigatorio (bool)     — asterisco no Label quando true (padrão: false)
//
// EXEMPLOS DE USO:
//   <FormFieldSelect
//     id="rotulo"
//     label="Tipo de endereço"
//     valor={rotulo}
//     onChange={(e) => setRotulo(e.target.value)}
//     opcoes={[
//       { valor: 'CASA',     label: '🏠 Casa' },
//       { valor: 'TRABALHO', label: '💼 Trabalho' },
//       { valor: 'OUTRO',    label: '✏️ Outro' },
//     ]}
//     obrigatorio
//   />

import Label from '../../atomos/atomosJSX/Label';
import Select from '../../atomos/atomosJSX/Select';
import MensagemErro from '../../atomos/atomosJSX/MensagemErro';
import '../moleculasCSS/FormFieldSelect.css';

function FormFieldSelect({
  id,
  label,
  valor,
  onChange,
  opcoes = [],
  erro = '',
  obrigatorio = false,
}) {
  return (
    <div className="form-field-select">
      <Label texto={label} htmlFor={id} obrigatorio={obrigatorio} />
      <Select id={id} valor={valor} onChange={onChange} opcoes={opcoes} erro={!!erro} />
      <MensagemErro mensagem={erro} />
    </div>
  );
}

export default FormFieldSelect;
