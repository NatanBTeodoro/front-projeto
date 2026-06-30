import Label from '../../atomos/atomosJSX/Label';
import Input from '../../atomos/atomosJSX/Input';
import MensagemErro from '../../atomos/atomosJSX/MensagemErro';
import { mascararCpf, mascararMoedaInput } from '../../../utils/formatacao';
import '../moleculasCSS/FormField.css';

function FormField({
  id,
  label,
  valor,
  onChange,
  placeholder = '',
  tipo = 'text',
  mascara,
  erro = '',
  obrigatorio = false,
  desabilitado = false,
}) {
  function handleChange(e) {
    if (!onChange) return;

    if (mascara === 'cpf') {
      onChange({ target: { value: mascararCpf(e.target.value) } });
      return;
    }

    if (mascara === 'moeda') {
      onChange({ target: { value: mascararMoedaInput(e.target.value) } });
      return;
    }

    onChange(e);
  }

  const tipoInput = mascara === 'moeda' || mascara === 'cpf' ? 'text' : tipo;
  const inputMode = mascara === 'moeda' ? 'decimal' : mascara === 'cpf' ? 'numeric' : undefined;

  return (
    <div className="form-field">
      <Label texto={label} htmlFor={id} obrigatorio={obrigatorio} />
      <Input
        id={id}
        tipo={tipoInput}
        inputMode={inputMode}
        valor={valor}
        onChange={handleChange}
        placeholder={placeholder}
        erro={!!erro}
        desabilitado={desabilitado}
      />
      <MensagemErro mensagem={erro} />
    </div>
  );
}

export default FormField;
