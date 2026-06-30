// moleculas/moleculasJSX/CardPizza.jsx

import Titulo from '../../atomos/atomosJSX/Titulo';
import Texto from '../../atomos/atomosJSX/Texto';
import Preco from '../../atomos/atomosJSX/Preco';
import BotaoAdicionar from '../../atomos/atomosJSX/BotaoAdicionar';
import '../moleculasCSS/CardPizza.css';

function CardPizza({ nome, descricao, valor, imagem, onAdicionar }) {
  return (
    <div className="card-pizza">
      <img src={imagem} alt={nome} className="card-pizza__imagem imagem-cardapio imagem-cardapio--lista" />
      <div className="card-pizza__info">
        <Titulo texto={nome} nivel={3} />
        <Texto conteudo={descricao} tamanho="pequeno" cor="secundario" />
        <Preco valor={valor} />
      </div>
      <BotaoAdicionar onClick={onAdicionar} />
    </div>
  );
}

export default CardPizza;
