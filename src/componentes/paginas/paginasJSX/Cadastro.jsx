// paginas/paginasJSX/Cadastro.jsx

import TemplatePublico from '../../templates/templatesJSX/TemplatePublico';
import FormCadastro from '../../organismos/organismosJSX/FormCadastro';
import { apiFetch } from '../../../services/api';
import '../paginasCSS/Cadastro.css';

function Cadastro() {
  async function handleCadastro(dados) {
    const { confirmarSenha, ...payload } = dados;
    const response = await apiFetch('/clientes', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { ok: true };
    }

    const erro = await response.json().catch(() => ({}));
    return { ok: false, erro: erro.mensagem || 'Não foi possível cadastrar.' };
  }

  return (
    <TemplatePublico rotaAtual="/cadastro">
      <div className="cadastro">
        <FormCadastro onSubmit={handleCadastro} />
      </div>
    </TemplatePublico>
  );
}

export default Cadastro;
