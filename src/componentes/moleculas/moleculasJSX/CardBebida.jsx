// moleculas/moleculasJSX/CardBebida.jsx

import Titulo from '../../atomos/atomosJSX/Titulo';
import Preco from '../../atomos/atomosJSX/Preco';
import BotaoAdicionar from '../../atomos/atomosJSX/BotaoAdicionar';
import '../moleculasCSS/CardBebida.css';

function CardBebida({ nome, valor, imagem, onAdicionar }) {
  return (
    <div className="card-bebida">
      <img src={imagem} alt={nome} className="card-bebida__imagem imagem-cardapio imagem-cardapio--lista" />
      <div className="card-bebida__info">
        <Titulo texto={nome} nivel={3} />
        <Preco valor={valor} />
      </div>
      <BotaoAdicionar onClick={onAdicionar} />
    </div>
  );
}

export default CardBebida;
