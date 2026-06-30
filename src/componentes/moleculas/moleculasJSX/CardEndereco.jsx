// moleculas/moleculasJSX/CardEndereco.jsx

import Texto from '../../atomos/atomosJSX/Texto';
import Badge from '../../atomos/atomosJSX/Badge';
import Botao from '../../atomos/atomosJSX/Botao';
import '../moleculasCSS/CardEndereco.css';

function montarLinhaEndereco(endereco) {
  let linha = `${endereco.rua}, ${endereco.numero} — ${endereco.bairro}, ${endereco.cidade}`;
  if (endereco.cep) linha += ` — CEP: ${endereco.cep}`;
  return linha;
}

function CardEndereco({
  endereco,
  onEditar,
  onRemover,
}) {
  const { rotulo, nomePersonalizado, principal } = endereco;

  return (
    <div className={`card-endereco ${principal ? 'card-endereco--principal' : ''}`}>
      <div className="card-endereco__info">
        <div className="card-endereco__rotulo">
          <Badge rotulo={rotulo} />
          {principal && <span className="card-endereco__tag-principal">Principal</span>}
        </div>
        {rotulo === 'OUTRO' && nomePersonalizado && (
          <Texto conteudo={nomePersonalizado} />
        )}
        <Texto conteudo={montarLinhaEndereco(endereco)} tamanho="pequeno" cor="secundario" />
      </div>
      <div className="card-endereco__acoes">
        <Botao texto="Editar" variante="secundario" onClick={onEditar} />
        <Botao texto="Remover" variante="perigo" onClick={onRemover} />
      </div>
    </div>
  );
}

export default CardEndereco;
