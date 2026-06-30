// templates/templatesJSX/TemplateAutenticado.jsx
//
// USO: Layout base para páginas que exigem login de cliente: Perfil, Pedido.
// NECESSIDADE: Garante Navbar (cliente) + conteúdo + Footer para rotas protegidas.
//              Redireciona para /login se o cliente não estiver autenticado.
//
// PROPS:
//   children  (node)     — conteúdo da página
//   rotaAtual (string)   — rota atual para destacar o NavItem ativo (padrão: "/perfil")
//   onSair    (function) — função de logout chamada pelo botão "Sair" da Navbar
//
// EXEMPLOS DE USO:
//   <TemplateAutenticado rotaAtual="/perfil" onSair={handleSair}>
//     <Perfil ... />
//   </TemplateAutenticado>

import Navbar from '../../organismos/organismosJSX/Navbar';
import Footer from '../../organismos/organismosJSX/Footer';
import '../templatesCSS/TemplateAutenticado.css';

function TemplateAutenticado({ children, rotaAtual = '/perfil', onSair }) {
  return (
    <div className="template-autenticado">
      <Navbar perfil="cliente" rotaAtual={rotaAtual} onSair={onSair} />
      <main className="template-autenticado__conteudo">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default TemplateAutenticado;
