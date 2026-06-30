// paginas/paginasJSX/EsqueciSenha.jsx

import { useState } from 'react';
import TemplatePublico from '../../templates/templatesJSX/TemplatePublico';
import FormField from '../../moleculas/moleculasJSX/FormField';
import FormFieldSenha from '../../moleculas/moleculasJSX/FormFieldSenha';
import Titulo from '../../atomos/atomosJSX/Titulo';
import Texto from '../../atomos/atomosJSX/Texto';
import Botao from '../../atomos/atomosJSX/Botao';
import Link from '../../atomos/atomosJSX/Link';
import MensagemErro from '../../atomos/atomosJSX/MensagemErro';
import MensagemSucesso from '../../atomos/atomosJSX/MensagemSucesso';
import { apiFetch } from '../../../services/api';
import { cpfValido } from '../../../utils/formatacao';
import '../paginasCSS/EsqueciSenha.css';

function EsqueciSenha() {
  const [dados, setDados] = useState({
    usuario: '',
    cpf: '',
    novaSenha: '',
    confirmarSenha: '',
  });
  const [erros, setErros] = useState({});
  const [erroGeral, setErroGeral] = useState('');
  const [sucesso, setSucesso] = useState('');

  function atualizar(campo) {
    return (e) => setDados((d) => ({ ...d, [campo]: e.target.value }));
  }

  function validar() {
    const e = {};
    if (!dados.usuario.trim()) e.usuario = 'Usuário obrigatório.';
    if (!dados.cpf.trim()) e.cpf = 'CPF obrigatório.';
    else if (!cpfValido(dados.cpf)) e.cpf = 'CPF deve ter 11 dígitos.';
    if (dados.novaSenha.length < 6) e.novaSenha = 'Mínimo 6 caracteres.';
    if (dados.novaSenha !== dados.confirmarSenha) e.confirmarSenha = 'As senhas não coincidem.';
    return e;
  }

  async function handleSubmit() {
    const e = validar();
    if (Object.keys(e).length > 0) {
      setErros(e);
      return;
    }

    setErros({});
    setErroGeral('');
    setSucesso('');

    try {
      const response = await apiFetch('/clientes/recuperar-senha', {
        method: 'POST',
        body: JSON.stringify({
          usuario: dados.usuario,
          cpf: dados.cpf,
          novaSenha: dados.novaSenha,
        }),
      });

      if (response.ok) {
        setSucesso('Senha redefinida! Você já pode entrar.');
        setTimeout(() => { window.location.href = '/login'; }, 2000);
      } else {
        const body = await response.json();
        setErroGeral(body.mensagem || 'Não foi possível redefinir a senha.');
      }
    } catch {
      setErroGeral('Erro de conexão. Tente novamente.');
    }
  }

  return (
    <TemplatePublico rotaAtual="/login">
      <div className="esqueci-senha">
        <Titulo texto="Esqueci minha senha" nivel={1} centralizado />
        <Texto
          conteudo="Informe seu usuário e CPF cadastrados para criar uma nova senha."
          tamanho="pequeno"
          cor="secundario"
        />
        <div className="esqueci-senha__campos">
          <FormField id="usuario" label="Usuário" valor={dados.usuario} onChange={atualizar('usuario')} obrigatorio erro={erros.usuario} />
          <FormField id="cpf" label="CPF" valor={dados.cpf} onChange={atualizar('cpf')} placeholder="000.000.000-00" mascara="cpf" obrigatorio erro={erros.cpf} />
          <FormFieldSenha id="novaSenha" label="Nova senha" valor={dados.novaSenha} onChange={atualizar('novaSenha')} obrigatorio erro={erros.novaSenha} />
          <FormFieldSenha id="confirmarSenha" label="Confirmar nova senha" valor={dados.confirmarSenha} onChange={atualizar('confirmarSenha')} obrigatorio erro={erros.confirmarSenha} />
        </div>
        <MensagemErro mensagem={erroGeral} />
        <MensagemSucesso mensagem={sucesso} />
        <Botao texto="Redefinir senha" variante="primario" larguraTotal onClick={handleSubmit} />
        <div className="esqueci-senha__voltar">
          <Link texto="Voltar ao login" href="/login" />
        </div>
      </div>
    </TemplatePublico>
  );
}

export default EsqueciSenha;
