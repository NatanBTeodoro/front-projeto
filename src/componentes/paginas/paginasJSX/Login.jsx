// paginas/paginasJSX/Login.jsx

import { useState } from 'react';
import TemplatePublico from '../../templates/templatesJSX/TemplatePublico';
import FormLogin from '../../organismos/organismosJSX/FormLogin';
import { apiFetch } from '../../../services/api';
import '../paginasCSS/Login.css';

function Login() {
  const [erroApi, setErroApi] = useState('');

  async function handleLogin(dados) {
    setErroApi('');
    try {
      const response = await apiFetch('/clientes/login', {
        method: 'POST',
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        const cliente = await response.json();
        localStorage.setItem('clienteId', cliente.id);
        localStorage.setItem('clienteNome', cliente.nomeCompleto);
        window.location.href = '/pedido';
      } else {
        const body = await response.json().catch(() => ({}));
        setErroApi(body.mensagem || 'Usuário ou senha inválidos.');
      }
    } catch {
      setErroApi('Erro de conexão. Tente novamente.');
    }
  }

  return (
    <TemplatePublico rotaAtual="/login">
      <div className="login">
        <FormLogin
          onSubmit={handleLogin}
          onIrCadastro={() => { window.location.href = '/cadastro'; }}
          erroExterno={erroApi}
        />
      </div>
    </TemplatePublico>
  );
}

export default Login;
