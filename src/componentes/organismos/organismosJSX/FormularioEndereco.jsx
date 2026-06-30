import { useState } from 'react';
import FormField from '../../moleculas/moleculasJSX/FormField';
import Label from '../../atomos/atomosJSX/Label';
import Botao from '../../atomos/atomosJSX/Botao';
import '../organismosCSS/FormularioEndereco.css';

const ROTULOS = [
  { valor: 'CASA', label: 'Casa' },
  { valor: 'TRABALHO', label: 'Trabalho' },
  { valor: 'OUTRO', label: 'Outro' },
];

const ENDERECO_VAZIO = {
  rotulo: 'CASA',
  nomePersonalizado: '',
  cep: '',
  cidade: '',
  bairro: '',
  rua: '',
  numero: '',
  principal: false,
};

async function buscarCep(cep) {
  const apenasNumeros = cep.replace(/\D/g, '');
  if (apenasNumeros.length !== 8) return null;
  const response = await fetch(`https://viacep.com.br/ws/${apenasNumeros}/json/`);
  const dados = await response.json();
  if (dados.erro) return null;
  return dados;
}

function FormularioEndereco({ enderecoInicial, onSalvar, onCancelar, titulo = 'Novo endereço' }) {
  const [dados, setDados] = useState({ ...ENDERECO_VAZIO, ...enderecoInicial });
  const [erros, setErros] = useState({});

  function atualizar(campo) {
    return (e) => {
      const valor = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setDados((d) => ({ ...d, [campo]: valor }));
    };
  }

  async function handleCepChange(e) {
    const cep = e.target.value;
    setDados((d) => ({ ...d, cep }));
    const apenasNumeros = cep.replace(/\D/g, '');
    if (apenasNumeros.length === 8) {
      try {
        const resultado = await buscarCep(cep);
        if (resultado) {
          setDados((d) => ({
            ...d,
            cep,
            cidade: resultado.localidade || '',
            bairro: resultado.bairro || '',
            rua: resultado.logradouro || '',
          }));
        }
      } catch {
        // CEP opcional
      }
    }
  }

  function validar() {
    const e = {};
    if (!dados.cidade.trim()) e.cidade = 'Cidade obrigatória.';
    if (!dados.bairro.trim()) e.bairro = 'Bairro obrigatório.';
    if (!dados.rua.trim()) e.rua = 'Rua obrigatória.';
    if (!dados.numero.trim()) e.numero = 'Número obrigatório.';
    if (dados.rotulo === 'OUTRO' && !dados.nomePersonalizado.trim()) {
      e.nomePersonalizado = 'Informe o nome do endereço.';
    }
    return e;
  }

  function handleSubmit() {
    const e = validar();
    if (Object.keys(e).length > 0) {
      setErros(e);
      return;
    }
    setErros({});
    onSalvar({
      ...dados,
      nomePersonalizado: dados.rotulo === 'OUTRO' ? dados.nomePersonalizado.trim() : '',
    });
  }

  return (
    <div className="formulario-endereco">
      <h3 className="formulario-endereco__titulo">{titulo}</h3>

      <div className="formulario-endereco__campo">
        <Label texto="Tipo do endereço" htmlFor="rotulo" obrigatorio />
        <select id="rotulo" className="formulario-endereco__select" value={dados.rotulo} onChange={atualizar('rotulo')}>
          {ROTULOS.map((r) => (
            <option key={r.valor} value={r.valor}>{r.label}</option>
          ))}
        </select>
      </div>

      {dados.rotulo === 'OUTRO' && (
        <FormField
          id="nomePersonalizado"
          label="Nome do endereço"
          valor={dados.nomePersonalizado}
          onChange={atualizar('nomePersonalizado')}
          placeholder="Ex: Casa da Vó"
          obrigatorio
          erro={erros.nomePersonalizado}
        />
      )}

      <FormField id="cep" label="CEP (opcional)" valor={dados.cep} onChange={handleCepChange} placeholder="00000-000" />
      <FormField id="cidade" label="Cidade" valor={dados.cidade} onChange={atualizar('cidade')} obrigatorio erro={erros.cidade} />
      <FormField id="bairro" label="Bairro" valor={dados.bairro} onChange={atualizar('bairro')} obrigatorio erro={erros.bairro} />
      <FormField id="rua" label="Rua" valor={dados.rua} onChange={atualizar('rua')} obrigatorio erro={erros.rua} />
      <FormField id="numero" label="Número" valor={dados.numero} onChange={atualizar('numero')} obrigatorio erro={erros.numero} />

      <label className="formulario-endereco__checkbox">
        <input type="checkbox" checked={dados.principal} onChange={atualizar('principal')} />
        Definir como endereço principal
      </label>

      <div className="formulario-endereco__acoes">
        <Botao texto="Salvar endereço" variante="primario" onClick={handleSubmit} />
        <Botao texto="Cancelar" variante="secundario" onClick={onCancelar} />
      </div>
    </div>
  );
}

export default FormularioEndereco;
export { ENDERECO_VAZIO };
