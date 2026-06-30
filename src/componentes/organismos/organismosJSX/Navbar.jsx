// organismos/organismosJSX/Navbar.jsx
//
// USO: Barra de navegação superior presente em todas as páginas.
// NECESSIDADE: Agrupa Logo + NavItems conforme o perfil do usuário logado.
//              Exibe itens diferentes para visitante, cliente e admin.
//
// PROPS:
//   perfil      (string) — "visitante" | "cliente" | "admin" (padrão: "visitante")
//   rotaAtual   (string) — rota atual para destacar o NavItem ativo (ex: "/perfil")
//   onSair      (function) — função chamada ao clicar em "Sair"
//
// EXEMPLOS DE USO:
//   <Navbar perfil="visitante" rotaAtual="/" />
//   <Navbar perfil="cliente" rotaAtual="/perfil" onSair={handleSair} />
//   <Navbar perfil="admin" rotaAtual="/admin" onSair={handleSair} />

import { Link } from 'react-router-dom';
import Logo from '../../atomos/atomosJSX/Logo';
import NavItem from '../../moleculas/moleculasJSX/NavItem';
import '../organismosCSS/Navbar.css';

const itensVisitante = [
  { texto: 'Pizzas',   href: '/#pizzas' },
  { texto: 'Bebidas',  href: '/#bebidas' },
  { texto: 'Cadastro', href: '/cadastro' },
  { texto: 'Entrar',   href: '/login' },
];

const itensCliente = [
  { texto: 'Fazer Pedido', href: '/pedido' },
  { texto: 'Meus Pedidos', href: '/meus-pedidos' },
  { texto: 'Perfil',       href: '/perfil' },
];

const itensAdmin = [
  { texto: 'Cardápio',  href: '/admin/cardapio' },
  { texto: 'Clientes',  href: '/admin/clientes' },
  { texto: 'Pedidos',   href: '/admin/pedidos' },
];

function Navbar({ perfil = 'visitante', rotaAtual = '/', onSair }) {
  const itens =
    perfil === 'admin'   ? itensAdmin   :
    perfil === 'cliente' ? itensCliente :
    itensVisitante;

  return (
    <nav className="navbar">
      <div className="navbar__conteudo">
        <Link to="/" className="navbar__logo">
          <Logo />
        </Link>
        <ul className="navbar__menu">
          {itens.map((item) => (
            <NavItem
              key={item.href}
              texto={item.texto}
              href={item.href}
              ativo={rotaAtual === item.href}
            />
          ))}
          {(perfil === 'cliente' || perfil === 'admin') && (
            <li>
              <button className="navbar__sair" onClick={onSair}>
                Sair
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
