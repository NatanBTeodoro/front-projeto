// organismos/organismosJSX/ListaPizzas.jsx

import CardPizza from '../../moleculas/moleculasJSX/CardPizza';
import Texto from '../../atomos/atomosJSX/Texto';
import { obterImagemPizza } from '../../../utils/imagens';
import '../organismosCSS/ListaPizzas.css';

function ListaPizzas({ pizzas = [], onAdicionar }) {
  if (pizzas.length === 0) {
    return <Texto conteudo="Nenhuma pizza disponível no momento." cor="secundario" />;
  }

  return (
    <div className="lista-pizzas">
      {pizzas.map((pizza) => (
        <CardPizza
          key={pizza.id}
          nome={pizza.nome}
          descricao={pizza.descricao}
          valor={pizza.valor}
          imagem={obterImagemPizza(pizza.nome, pizza.imagem)}
          onAdicionar={() => onAdicionar(pizza)}
        />
      ))}
    </div>
  );
}

export default ListaPizzas;
