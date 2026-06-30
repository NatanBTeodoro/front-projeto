// organismos/organismosJSX/FormLogin.jsx

import { useState } from 'react';
import FormField from '../../moleculas/moleculasJSX/FormField';
import FormFieldSenha from '../../moleculas/moleculasJSX/FormFieldSenha';
import Botao from '../../atomos/atomosJSX/Botao';
import Link from '../../atomos/atomosJSX/Link';
import Titulo from '../../atomos/atomosJSX/Titulo';
import MensagemErro from '../../atomos/atomosJSX/MensagemErro';
import '../organismosCSS/FormLogin.css';

function FormLogin({ onSubmit, onIrCadastro, erroExterno = '' }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erroGeral, setErroGeral] = useState('');
  const [erros, setErros] = useState({});

  function handleSubmit() {
    const e = {};
    if (!usuario.trim()) e.usuario = 'Usuário obrigatório.';
    if (!senha.trim())   e.senha   = 'Senha obrigatória.';
    if (Object.keys(e).length > 0) {
      setErros(e);
      return;
    }
    setErros({});
    setErroGeral('');
    if (onSubmit) onSubmit({ usuario, senha });
  }

  return (
    <div className="form-login">
      <Titulo texto="Entrar" nivel={1} centralizado />
      <div className="form-login__campos">
        <FormField id="usuario" label="Usuário" valor={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="joaosilva" obrigatorio erro={erros.usuario} />
        <FormFieldSenha id="senha" label="Senha" valor={senha} onChange={(e) => setSenha(e.target.value)} obrigatorio erro={erros.senha} />
      </div>
      <div className="form-login__esqueci">
        <Link texto="Esqueci minha senha" href="/login/esqueci-senha" />
      </div>
      <MensagemErro mensagem={erroGeral || erroExterno} />
      <Botao texto="Entrar" variante="primario" larguraTotal onClick={handleSubmit} />
      <div className="form-login__cadastro">
        <span>Não tem conta? </span>
        <Link texto="Criar conta" href="/cadastro" />
      </div>
      <div className="form-login__admin">
        <Link texto="Acesso administrativo" href="/admin/login" />
      </div>
    </div>
  );
}

export default FormLogin;
