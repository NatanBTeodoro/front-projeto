// paginas/paginasJSX/Home.jsx

import { useState, useEffect } from 'react';
import TemplatePublico from '../../templates/templatesJSX/TemplatePublico';
import TemplateAutenticado from '../../templates/templatesJSX/TemplateAutenticado';
import TemplateAdmin from '../../templates/templatesJSX/TemplateAdmin';
import Logo from '../../atomos/atomosJSX/Logo';
import Texto from '../../atomos/atomosJSX/Texto';
import Botao from '../../atomos/atomosJSX/Botao';
import Titulo from '../../atomos/atomosJSX/Titulo';
import Preco from '../../atomos/atomosJSX/Preco';
import { apiJson } from '../../../services/api';
import { obterImagemPizza, obterImagemBebida } from '../../../utils/imagens';
import { aplicarSessaoVisitante } from '../../../utils/sessaoCliente';
import '../paginasCSS/Home.css';

const PIZZAS_SALGADAS = ['Portuguesa', 'Calabresa', 'Quatro Queijos'];
const PIZZAS_DOCES = ['Chocolate Preto', 'Chocolate Branco com Morangos', 'Charge'];
const ORDEM_BEBIDAS = ['Água', 'Coca-Cola', 'Suco de Uva'];

function ordenarPorNomes(itens, ordem) {
  return [...itens].sort((a, b) => {
    const posA = ordem.indexOf(a.nome);
    const posB = ordem.indexOf(b.nome);
    if (posA === -1 && posB === -1) return a.nome.localeCompare(b.nome);
    if (posA === -1) return 1;
    if (posB === -1) return -1;
    return posA - posB;
  });
}

function CardItem({ nome, descricao, valor, imagem }) {
  return (
    <article className="home__card">
      <img
        src={imagem}
        alt={nome}
        className="home__card-imagem imagem-cardapio imagem-cardapio--destaque"
      />
      <div className="home__card-info">
        <Titulo texto={nome} nivel={3} />
        {descricao && (
          <Texto conteudo={descricao} tamanho="pequeno" cor="secundario" />
        )}
        <Preco valor={valor} />
      </div>
    </article>
  );
}

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const adminLogado = localStorage.getItem('adminLogado') === 'true';
  const visitanteForcado = aplicarSessaoVisitante();
  const clienteLogado = !visitanteForcado && Boolean(localStorage.getItem('clienteId'));
  const estaAutenticado = clienteLogado;

  function handleSairCliente() {
    localStorage.removeItem('clienteId');
    localStorage.removeItem('clienteNome');
    window.location.href = '/login';
  }

  function handleSairAdmin() {
    localStorage.removeItem('adminLogado');
    window.location.href = '/admin/login';
  }

  useEffect(() => {
    async function carregarCardapio() {
      const [listaPizzas, listaBebidas] = await Promise.all([
        apiJson('/pizzas'),
        apiJson('/bebidas'),
      ]);
      setPizzas(listaPizzas.filter((p) => p.ativo));
      setBebidas(ordenarPorNomes(listaBebidas.filter((b) => b.ativo), ORDEM_BEBIDAS));
    }
    carregarCardapio();
  }, []);

  const pizzasSalgadas = ordenarPorNomes(
    pizzas.filter((p) => PIZZAS_SALGADAS.includes(p.nome)),
    PIZZAS_SALGADAS,
  );
  const pizzasDoces = ordenarPorNomes(
    pizzas.filter((p) => PIZZAS_DOCES.includes(p.nome)),
    PIZZAS_DOCES,
  );
  const outrasPizzas = pizzas.filter(
    (p) => !PIZZAS_SALGADAS.includes(p.nome) && !PIZZAS_DOCES.includes(p.nome),
  );

  function handlePecaAgora() {
    window.location.href = estaAutenticado ? '/pedido' : '/cadastro';
  }

  function handleLogin() {
    window.location.href = '/login';
  }

  const conteudo = (
      <div className="home">
        <div className="home__hero">
          <Logo tamanho="grande" />
          <Texto
            conteudo="As melhores pizzas, fresquinhas e no conforto da sua casa."
            tamanho="grande"
            cor="secundario"
          />
          <div className="home__acoes">
            <Botao texto="Peça Agora!" variante="primario" onClick={handlePecaAgora} />
            {!estaAutenticado && (
              <Botao texto="Entrar" variante="fantasma" onClick={handleLogin} />
            )}
          </div>
        </div>

        {(pizzasSalgadas.length > 0 || pizzasDoces.length > 0 || outrasPizzas.length > 0) && (
          <section className="home__cardapio" id="pizzas">
            <Titulo texto="Nossas Pizzas" nivel={2} />

            {pizzasSalgadas.length > 0 && (
              <div className="home__subsecao">
                <h3 className="home__subtitulo">Salgadas</h3>
                <div className="home__grid">
                  {pizzasSalgadas.map((pizza) => (
                    <CardItem
                      key={pizza.id}
                      nome={pizza.nome}
                      descricao={pizza.descricao}
                      valor={pizza.valor}
                      imagem={obterImagemPizza(pizza.nome, pizza.imagem)}
                    />
                  ))}
                </div>
              </div>
            )}

            {pizzasDoces.length > 0 && (
              <div className="home__subsecao">
                <h3 className="home__subtitulo">Doces</h3>
                <div className="home__grid">
                  {pizzasDoces.map((pizza) => (
                    <CardItem
                      key={pizza.id}
                      nome={pizza.nome}
                      descricao={pizza.descricao}
                      valor={pizza.valor}
                      imagem={obterImagemPizza(pizza.nome, pizza.imagem)}
                    />
                  ))}
                </div>
              </div>
            )}

            {outrasPizzas.length > 0 && (
              <div className="home__subsecao">
                <div className="home__grid">
                  {outrasPizzas.map((pizza) => (
                    <CardItem
                      key={pizza.id}
                      nome={pizza.nome}
                      descricao={pizza.descricao}
                      valor={pizza.valor}
                      imagem={obterImagemPizza(pizza.nome, pizza.imagem)}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {pizzas.length > 0 && bebidas.length > 0 && (
          <div className="home__separador" aria-hidden="true" />
        )}

        {bebidas.length > 0 && (
          <section className="home__cardapio home__cardapio--bebidas" id="bebidas">
            <Titulo texto="Bebidas" nivel={2} />
            <div className="home__grid home__grid--bebidas">
              {bebidas.map((bebida) => (
                <CardItem
                  key={bebida.id}
                  nome={bebida.nome}
                  valor={bebida.valor}
                  imagem={obterImagemBebida(bebida.nome, bebida.imagem)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
  );

  if (adminLogado) {
    return (
      <TemplateAdmin rotaAtual="/" onSair={handleSairAdmin}>
        {conteudo}
      </TemplateAdmin>
    );
  }

  if (clienteLogado) {
    return (
      <TemplateAutenticado rotaAtual="/" onSair={handleSairCliente}>
        {conteudo}
      </TemplateAutenticado>
    );
  }

  return (
    <TemplatePublico rotaAtual="/">
      {conteudo}
    </TemplatePublico>
  );
}

export default Home;
