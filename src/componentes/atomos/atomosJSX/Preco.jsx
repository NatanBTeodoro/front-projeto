import { formatarMoeda, moedaParaNumero } from '../../../utils/formatacao';
import '../atomosCSS/Preco.css';

function Preco({ valor, destaque = false }) {
  const formatado = formatarMoeda(moedaParaNumero(valor));

  return (
    <span className={`preco ${destaque ? 'preco--destaque' : ''}`}>
      {formatado}
    </span>
  );
}

export default Preco;
