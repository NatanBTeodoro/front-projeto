// organismos/organismosJSX/ListaBebidas.jsx

import CardBebida from '../../moleculas/moleculasJSX/CardBebida';
import Texto from '../../atomos/atomosJSX/Texto';
import { obterImagemBebida } from '../../../utils/imagens';
import '../organismosCSS/ListaBebidas.css';

function ListaBebidas({ bebidas = [], onAdicionar }) {
  if (bebidas.length === 0) {
    return <Texto conteudo="Nenhuma bebida disponível no momento." cor="secundario" />;
  }

  return (
    <div className="lista-bebidas">
      {bebidas.map((bebida) => (
        <CardBebida
          key={bebida.id}
          nome={bebida.nome}
          valor={bebida.valor}
          imagem={obterImagemBebida(bebida.nome, bebida.imagem)}
          onAdicionar={() => onAdicionar(bebida)}
        />
      ))}
    </div>
  );
}

export default ListaBebidas;
