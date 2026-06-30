// paginas/paginasJSX/Pedido.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TemplateAutenticado from '../../templates/templatesJSX/TemplateAutenticado';
import ListaPizzas from '../../organismos/organismosJSX/ListaPizzas';
import ListaBebidas from '../../organismos/organismosJSX/ListaBebidas';
import ResumoPedido from '../../organismos/organismosJSX/ResumoPedido';
import Titulo from '../../atomos/atomosJSX/Titulo';
import Botao from '../../atomos/atomosJSX/Botao';
import MensagemErro from '../../atomos/atomosJSX/MensagemErro';
import { apiFetch, apiJson } from '../../../services/api';
import '../paginasCSS/Pedido.css';

function Pedido() {
  const navigate = useNavigate();
  const clienteId = Number(localStorage.getItem('clienteId'));
  const [abaAtiva, setAbaAtiva] = useState('pizzas');
  const [pizzas, setPizzas] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [itens, setItens] = useState([]);
  const [erroPedido, setErroPedido] = useState('');

  useEffect(() => {
    async function carregarCardapio() {
      setPizzas(await apiJson('/pizzas'));
      setBebidas(await apiJson('/bebidas'));
    }
    carregarCardapio();
  }, []);

  function adicionarItem(item) {
    const normalizado = {
      ...item,
      valorUnitario: item.valorUnitario ?? Number(item.valor),
    };
    setItens((prev) => {
      const existe = prev.find((i) => i.id === normalizado.id && i.tipo === normalizado.tipo);
      if (existe) {
        return prev.map((i) => (i.id === normalizado.id && i.tipo === normalizado.tipo)
          ? { ...i, quantidade: i.quantidade + 1 }
          : i);
      }
      return [...prev, { ...normalizado, quantidade: 1 }];
    });
  }

  function removerItem(id, tipo) {
    setItens((prev) => {
      const item = prev.find((i) => i.id === id && i.tipo === tipo);
      if (item.quantidade > 1) {
        return prev.map((i) => (i.id === id && i.tipo === tipo)
          ? { ...i, quantidade: i.quantidade - 1 }
          : i);
      }
      return prev.filter((i) => !(i.id === id && i.tipo === tipo));
    });
  }

  async function handlePedir() {
    setErroPedido('');

    const enderecos = await apiJson(`/clientes/${clienteId}/enderecos`);
    if (!enderecos.length) {
      setErroPedido('Cadastre seu endereço de entrega no perfil antes de fazer um pedido.');
      return;
    }

    const body = {
      clienteId,
      itens: itens.map((i) => ({
        tipo: i.tipo,
        itemId: i.id,
        quantidade: i.quantidade,
      })),
    };

    const response = await apiFetch('/pedidos', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const pedido = await response.json();
      setItens([]);
      navigate('/pedido/confirmacao', { state: { pedido } });
    }
  }

  function handleSair() {
    localStorage.removeItem('clienteId');
    localStorage.removeItem('clienteNome');
    window.location.href = '/login';
  }

  return (
    <TemplateAutenticado rotaAtual="/pedido" onSair={handleSair}>
      <div className="pedido">

        <div className="pedido__abas">
          <Botao
            texto="Pizzas"
            variante={abaAtiva === 'pizzas' ? 'primario' : 'secundario'}
            onClick={() => setAbaAtiva('pizzas')}
          />
          <Botao
            texto="Bebidas"
            variante={abaAtiva === 'bebidas' ? 'primario' : 'secundario'}
            onClick={() => setAbaAtiva('bebidas')}
          />
        </div>

        <div className="pedido__conteudo">

          <div className="pedido__cardapio">
            {abaAtiva === 'pizzas' && (
              <section>
                <Titulo texto="Pizzas" nivel={2} />
                <ListaPizzas
                  pizzas={pizzas}
                  onAdicionar={(pizza) => adicionarItem({ ...pizza, tipo: 'PIZZA' })}
                />
              </section>
            )}
            {abaAtiva === 'bebidas' && (
              <section>
                <Titulo texto="Bebidas" nivel={2} />
                <ListaBebidas
                  bebidas={bebidas}
                  onAdicionar={(bebida) => adicionarItem({ ...bebida, tipo: 'BEBIDA' })}
                />
              </section>
            )}
          </div>

          <aside className="pedido__resumo">
            {erroPedido && (
              <div className="pedido__aviso aviso-claro" role="alert">
                <MensagemErro mensagem={erroPedido} />
              </div>
            )}
            <ResumoPedido
              itens={itens}
              onRemover={(id) => {
                const item = itens.find((i) => i.id === id);
                if (item) removerItem(id, item.tipo);
              }}
              onPedir={handlePedir}
              onCancelar={() => setItens([])}
            />
          </aside>

        </div>
      </div>
    </TemplateAutenticado>
  );
}

export default Pedido;
