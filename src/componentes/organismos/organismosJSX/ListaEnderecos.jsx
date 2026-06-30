// organismos/organismosJSX/ListaEnderecos.jsx
//
// USO: Seção de gerenciamento de endereços na página de Perfil do cliente.
// NECESSIDADE: Lista todos os endereços cadastrados, controla o limite de 7
//              e exibe o botão de adicionar novo endereço.
//
// PROPS:
//   enderecos   (array)    — lista de { id, cep, rotulo, nomePersonalizado, principal }
//   onEditar    (function) — chamada com o endereço ao clicar em "Editar"
//   onRemover   (function) — chamada com o id ao clicar em "Remover"
//   onAdicionar (function) — chamada ao clicar em "Adicionar endereço"
//
// EXEMPLOS DE USO:
//   <ListaEnderecos enderecos={enderecos} onEditar={handleEditar} onRemover={handleRemover} onAdicionar={handleAdicionar} />

import CardEndereco from '../../moleculas/moleculasJSX/CardEndereco';
import Botao from '../../atomos/atomosJSX/Botao';
import Titulo from '../../atomos/atomosJSX/Titulo';
import Texto from '../../atomos/atomosJSX/Texto';
import Divisor from '../../atomos/atomosJSX/Divisor';
import '../organismosCSS/ListaEnderecos.css';

const LIMITE_ENDERECOS = 7;

function ListaEnderecos({ enderecos = [], onEditar, onRemover, onAdicionar }) {
  const limiteAtingido = enderecos.length >= LIMITE_ENDERECOS;

  return (
    <div className="lista-enderecos">
      <div className="lista-enderecos__cabecalho">
        <Titulo texto="Meus Endereços" nivel={2} />
        <Texto conteudo={`${enderecos.length}/${LIMITE_ENDERECOS} endereços`} tamanho="pequeno" cor="secundario" />
      </div>

      <Divisor margem="pequeno" />

      {enderecos.length === 0 ? (
        <div className="aviso-claro">
          <Texto conteudo="Nenhum endereço cadastrado. Adicione Casa, Trabalho ou Outro para receber seus pedidos." />
        </div>
      ) : (
        <div className="lista-enderecos__itens">
          {enderecos.map((end) => (
            <CardEndereco
              key={end.id}
              endereco={end}
              onEditar={() => onEditar(end)}
              onRemover={() => onRemover(end.id)}
            />
          ))}
        </div>
      )}

      <Botao
        texto="+ Adicionar endereço"
        variante="secundario"
        larguraTotal
        onClick={onAdicionar}
        desabilitado={limiteAtingido}
      />
      {limiteAtingido && (
        <Texto conteudo="Limite de 7 endereços atingido." tamanho="pequeno" cor="secundario" />
      )}
    </div>
  );
}

export default ListaEnderecos;
