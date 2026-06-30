// moleculas/moleculasJSX/NavItem.jsx
//
// USO: Cada item da barra de navegação superior (Pizzas, Bebidas, Cadastro,
//      Perfil, Fazer Pedido, Sair).
// NECESSIDADE: Combina o átomo Link com um indicador de rota ativa,
//              algo que o Link sozinho não faz.
//
// PROPS:
//   texto  (string) — texto exibido no item
//   href   (string) — rota de destino
//   ativo  (bool)   — destaca o item quando é a rota atual (padrão: false)
//
// EXEMPLOS DE USO:
//   <NavItem texto="Pizzas"       href="/pedido#pizzas" />
//   <NavItem texto="Perfil"       href="/perfil" ativo />
//   <NavItem texto="Fazer Pedido" href="/pedido" />

import Link from '../../atomos/atomosJSX/Link';
import '../moleculasCSS/NavItem.css';

function NavItem({ texto, href, ativo = false }) {
  return (
    <li className={`nav-item ${ativo ? 'nav-item--ativo' : ''}`}>
      <Link texto={texto} href={href} variante="nav" />
    </li>
  );
}

export default NavItem;
