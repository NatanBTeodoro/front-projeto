// templates/templatesJSX/TemplatePublico.jsx
//
// USO: Layout base para páginas acessíveis sem login: Home, Cadastro, Login.
// NECESSIDADE: Garante que Navbar (visitante) + conteúdo + Footer
//              apareçam consistentemente em todas as páginas públicas.
//
// PROPS:
//   children  (node)   — conteúdo da página inserido entre Navbar e Footer
//   rotaAtual (string) — rota atual para destacar o NavItem ativo (padrão: "/")
//
// EXEMPLOS DE USO:
//   <TemplatePublico rotaAtual="/cadastro">
//     <FormCadastro ... />
//   </TemplatePublico>

import Navbar from '../../organismos/organismosJSX/Navbar';
import Footer from '../../organismos/organismosJSX/Footer';
import '../templatesCSS/TemplatePublico.css';

function TemplatePublico({ children, rotaAtual = '/' }) {
  return (
    <div className="template-publico">
      <Navbar perfil="visitante" rotaAtual={rotaAtual} />
      <main className="template-publico__conteudo">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default TemplatePublico;
