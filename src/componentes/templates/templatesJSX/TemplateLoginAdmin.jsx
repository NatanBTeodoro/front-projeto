import { Link } from 'react-router-dom';
import Logo from '../../atomos/atomosJSX/Logo';
import Footer from '../../organismos/organismosJSX/Footer';
import '../templatesCSS/TemplateLoginAdmin.css';

function TemplateLoginAdmin({ children }) {
  return (
    <div className="template-login-admin">
      <header className="template-login-admin__cabecalho">
        <Link to="/" className="template-login-admin__logo">
          <Logo />
        </Link>
        <span className="template-login-admin__badge">Área Administrativa</span>
      </header>
      <main className="template-login-admin__conteudo">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default TemplateLoginAdmin;
