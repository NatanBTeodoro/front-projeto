// templates/templatesJSX/TemplateAdmin.jsx
//
// USO: Layout base para todas as páginas do painel administrativo.
// NECESSIDADE: Garante Navbar (admin) + conteúdo + Footer para rotas de admin.
//              Mantém o layout consistente em Dashboard, Cardápio, Clientes e Pedidos.
//
// PROPS:
//   children  (node)     — conteúdo da página admin
//   rotaAtual (string)   — rota atual para destacar o NavItem ativo (padrão: "/admin/dashboard")
//   onSair    (function) — função de logout chamada pelo botão "Sair" da Navbar
//
// EXEMPLOS DE USO:
//   <TemplateAdmin rotaAtual="/admin/cardapio" onSair={handleSair}>
//     <AdminCardapio ... />
//   </TemplateAdmin>

import Navbar from '../../organismos/organismosJSX/Navbar';
import Footer from '../../organismos/organismosJSX/Footer';
import '../templatesCSS/TemplateAdmin.css';

function TemplateAdmin({ children, rotaAtual = '/admin/dashboard', onSair }) {
  return (
    <div className="template-admin">
      <Navbar perfil="admin" rotaAtual={rotaAtual} onSair={onSair} />
      <main className="template-admin__conteudo">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default TemplateAdmin;
