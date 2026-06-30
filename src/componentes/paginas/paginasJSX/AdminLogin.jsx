// paginas/paginasJSX/AdminLogin.jsx

import { useState } from 'react';
import TemplateLoginAdmin from '../../templates/templatesJSX/TemplateLoginAdmin';
import FormFieldSenha from '../../moleculas/moleculasJSX/FormFieldSenha';
import FormField from '../../moleculas/moleculasJSX/FormField';
import Titulo from '../../atomos/atomosJSX/Titulo';
import Texto from '../../atomos/atomosJSX/Texto';
import Botao from '../../atomos/atomosJSX/Botao';
import Link from '../../atomos/atomosJSX/Link';
import MensagemErro from '../../atomos/atomosJSX/MensagemErro';
import { apiFetch } from '../../../services/api';
import '../paginasCSS/AdminLogin.css';

function AdminLogin() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  async function handleLogin() {
    if (!usuario.trim() || !senha.trim()) {
      setErro('Preencha usuário e senha.');
      return;
    }

    const response = await apiFetch('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ usuario, senha }),
    });

    if (response.ok) {
      localStorage.setItem('adminLogado', 'true');
      window.location.href = '/admin/dashboard';
    } else {
      setErro('Usuário ou senha inválidos.');
    }
  }

  return (
    <TemplateLoginAdmin>
      <div className="admin-login">
        <Titulo texto="Login Administrativo" nivel={1} centralizado />
        <Texto conteudo="Acesso exclusivo para gestão da Fogo & Lenha." tamanho="pequeno" cor="secundario" />
        <div className="admin-login__form">
          <FormField id="usuario" label="Usuário" valor={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="admin" obrigatorio />
          <FormFieldSenha id="senha" label="Senha" valor={senha} onChange={(e) => setSenha(e.target.value)} obrigatorio />
          <MensagemErro mensagem={erro} />
          <Botao texto="Entrar no painel" variante="primario" larguraTotal onClick={handleLogin} />
          <div className="admin-login__links">
            <Link texto="Esqueci minha senha" href="/admin/esqueci-senha" />
            <Link texto="Voltar ao site do cliente" href="/login" />
          </div>
        </div>
      </div>
    </TemplateLoginAdmin>
  );
}

export default AdminLogin;
