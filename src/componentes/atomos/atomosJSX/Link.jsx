// atoms/Link/Link.jsx
//
// USO: Links de navegação entre páginas — "Já tenho cadastro", "Criar conta",
//      itens da Navbar (Pizzas, Bebidas, Perfil, Fazer Pedido).
// NECESSIDADE: Padroniza cor e hover de todos os links da aplicação.
//
// PROPS:
//   texto    (string) — texto clicável exibido
//   href     (string) — caminho de destino (ex: "/cadastro")
//   variante (string) — "inline" | "nav" (padrão: "inline")
//                        inline → dentro de parágrafos
//                        nav    → itens da barra de navegação
//
// EXEMPLOS DE USO:
//   <Link texto="Já tenho cadastro" href="/login" />
//   <Link texto="Perfil" href="/perfil" variante="nav" />

import "../atomosCSS/Link.css";

function Link({ texto, href, variante = "inline" }) {
  return (
    <a href={href} className={`link link--${variante}`}>
      {texto}
    </a>
  );
}

export default Link;
