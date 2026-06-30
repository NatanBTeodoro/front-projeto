// organismos/organismosJSX/Footer.jsx

import Texto from '../../atomos/atomosJSX/Texto';
import '../organismosCSS/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__conteudo">
        <Texto conteudo="Fogo & Lenha — Criado por Natan 2026" tamanho="pequeno" cor="secundario" />

        <div className="footer__contato">
          <Texto conteudo="Contato" tamanho="pequeno" />
          <a href="mailto:email_teste_pizzaria@gmail.com" className="footer__link">
            email_teste_pizzaria@gmail.com
          </a>
          <a
            href="https://www.instagram.com/italystreetpizza/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            @pizzariateste
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
