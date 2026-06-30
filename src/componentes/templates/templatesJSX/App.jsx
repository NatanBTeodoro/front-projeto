import './App.css';

// Templates
import TemplatePublico from './componentes/templates/templatesJSX/TemplatePublico';
import TemplateAutenticado from './componentes/templates/templatesJSX/TemplateAutenticado';
import TemplateAdmin from './componentes/templates/templatesJSX/TemplateAdmin';

// Conteúdo de exemplo
import Titulo from './componentes/atomos/atomosJSX/Titulo';
import Texto from './componentes/atomos/atomosJSX/Texto';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

      {/* TemplatePublico */}
      <TemplatePublico rotaAtual="/cadastro">
        <Titulo texto="TemplatePublico" nivel={1} centralizado />
        <Texto conteudo="Conteúdo de uma página pública (ex: Cadastro, Login, Home)." cor="secundario" />
      </TemplatePublico>

      {/* TemplateAutenticado */}
      <TemplateAutenticado rotaAtual="/perfil" onSair={() => alert('Sair!')}>
        <Titulo texto="TemplateAutenticado" nivel={1} centralizado />
        <Texto conteudo="Conteúdo de uma página de cliente logado (ex: Perfil, Pedido)." cor="secundario" />
      </TemplateAutenticado>

      {/* TemplateAdmin */}
      <TemplateAdmin rotaAtual="/admin/cardapio" onSair={() => alert('Sair admin!')}>
        <Titulo texto="TemplateAdmin" nivel={1} centralizado />
        <Texto conteudo="Conteúdo de uma página do painel admin (ex: Cardápio, Clientes, Pedidos)." cor="secundario" />
      </TemplateAdmin>

    </div>
  );
}

export default App;
