// organismos/organismosJSX/FormCadastro.jsx

import { useState } from 'react';
import FormField from '../../moleculas/moleculasJSX/FormField';
import FormFieldSenha from '../../moleculas/moleculasJSX/FormFieldSenha';
import Botao from '../../atomos/atomosJSX/Botao';
import Link from '../../atomos/atomosJSX/Link';
import Titulo from '../../atomos/atomosJSX/Titulo';
import Texto from '../../atomos/atomosJSX/Texto';
import MensagemSucesso from '../../atomos/atomosJSX/MensagemSucesso';
import MensagemErro from '../../atomos/atomosJSX/MensagemErro';
import { cpfValido } from '../../../utils/formatacao';
import '../organismosCSS/FormCadastro.css';

function mapearErroApi(mensagem) {
  const texto = mensagem || 'Não foi possível cadastrar.';
  if (texto.toLowerCase().includes('cpf')) return { cpf: texto };
  if (texto.toLowerCase().includes('usuário') || texto.toLowerCase().includes('usuario')) {
    return { usuario: texto };
  }
  return { geral: texto };
}

function FormCadastro({ onSubmit }) {
  const [dados, setDados] = useState({
    nomeCompleto: '',
    cpf: '',
    usuario: '',
    senha: '',
    confirmarSenha: '',
  });
  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState('');
  const [enviando, setEnviando] = useState(false);

  function atualizar(campo) {
    return (e) => setDados((d) => ({ ...d, [campo]: e.target.value }));
  }

  function validar() {
    const e = {};
    if (!dados.nomeCompleto.trim()) e.nomeCompleto = 'Nome obrigatório.';
    if (!dados.cpf.trim())          e.cpf = 'CPF obrigatório.';
    else if (!cpfValido(dados.cpf)) e.cpf = 'CPF deve ter 11 dígitos.';
    if (!dados.usuario.trim())      e.usuario = 'Usuário obrigatório.';
    if (dados.senha.length < 6)     e.senha = 'Senha deve ter no mínimo 6 caracteres.';
    if (dados.senha !== dados.confirmarSenha) e.confirmarSenha = 'As senhas não coincidem.';
    return e;
  }

  async function handleSubmit() {
    const e = validar();
    if (Object.keys(e).length > 0) {
      setErros(e);
      setSucesso('');
      return;
    }

    setEnviando(true);
    setErros({});
    setSucesso('');

    try {
      const resultado = await onSubmit(dados);
      if (!resultado?.ok) {
        const mapeado = mapearErroApi(resultado?.erro);
        if (mapeado.geral) {
          setErros({ geral: mapeado.geral });
        } else {
          setErros(mapeado);
        }
        return;
      }

      setSucesso('Cadastro realizado com sucesso! Redirecionando...');
      setTimeout(() => { window.location.href = '/login'; }, 1200);
    } catch {
      setErros({ geral: 'Erro de conexão. Verifique se o servidor está ativo.' });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="form-cadastro">
      <Titulo texto="Criar conta" nivel={1} centralizado />
      <Texto
        conteudo="Após criar sua conta, acesse o perfil para cadastrar o endereço de entrega."
        tamanho="pequeno"
        cor="secundario"
      />
      <div className="form-cadastro__campos">
        <FormField id="nomeCompleto" label="Nome completo" valor={dados.nomeCompleto} onChange={atualizar('nomeCompleto')} placeholder="João Silva" obrigatorio erro={erros.nomeCompleto} />
        <FormField id="cpf" label="CPF" valor={dados.cpf} onChange={atualizar('cpf')} placeholder="000.000.000-00" mascara="cpf" obrigatorio erro={erros.cpf} />
        <FormField id="usuario" label="Usuário" valor={dados.usuario} onChange={atualizar('usuario')} placeholder="joaosilva" obrigatorio erro={erros.usuario} />
        <FormFieldSenha id="senha" label="Senha" valor={dados.senha} onChange={atualizar('senha')} obrigatorio erro={erros.senha} />
        <FormFieldSenha id="confirmarSenha" label="Confirmar senha" valor={dados.confirmarSenha} onChange={atualizar('confirmarSenha')} obrigatorio erro={erros.confirmarSenha} />
      </div>
      {erros.geral && <MensagemErro mensagem={erros.geral} />}
      <MensagemSucesso mensagem={sucesso} />
      <Botao texto={enviando ? 'Cadastrando...' : 'Cadastrar'} variante="primario" larguraTotal onClick={handleSubmit} desabilitado={enviando} />
      <div className="form-cadastro__login">
        <span>Já tem cadastro? </span>
        <Link texto="Entrar" href="/login" />
      </div>
    </div>
  );
}

export default FormCadastro;
