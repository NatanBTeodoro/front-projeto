// paginas/paginasJSX/AdminCardapio.jsx

import { useState, useEffect } from 'react';
import TemplateAdmin from '../../templates/templatesJSX/TemplateAdmin';
import Titulo from '../../atomos/atomosJSX/Titulo';
import Texto from '../../atomos/atomosJSX/Texto';
import Botao from '../../atomos/atomosJSX/Botao';
import Divisor from '../../atomos/atomosJSX/Divisor';
import FormField from '../../moleculas/moleculasJSX/FormField';
import FormFieldArquivoImagem from '../../moleculas/moleculasJSX/FormFieldArquivoImagem';
import { apiFetch, apiJson } from '../../../services/api';
import { formatarMoeda, mascararMoedaInput, moedaParaNumero } from '../../../utils/formatacao';
import { obterImagemPizza, obterImagemBebida } from '../../../utils/imagens';
import '../paginasCSS/AdminCardapio.css';

const FORM_PIZZA_VAZIO = { nome: '', descricao: '', valor: '', imagem: '', imagemNome: '' };
const FORM_BEBIDA_VAZIO = { nome: '', valor: '', imagem: '', imagemNome: '' };

function valorParaCampoMoeda(valor) {
  const numero = moedaParaNumero(valor);
  if (!numero) return '';
  return mascararMoedaInput(String(Math.round(numero * 100)));
}

function imagemParaFormulario(item, obterImagem) {
  if (!item.imagem || item.imagem === 'base') {
    return { imagem: '', imagemNome: '' };
  }
  const preview = item.imagem.startsWith('data:')
    ? item.imagem
    : obterImagem(item.nome, item.imagem);
  return { imagem: preview, imagemNome: 'Imagem atual' };
}

function AdminCardapio() {
  const [pizzas, setPizzas] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [novaPizza, setNovaPizza] = useState({ ...FORM_PIZZA_VAZIO });
  const [novaBebida, setNovaBebida] = useState({ ...FORM_BEBIDA_VAZIO });
  const [pizzaEditandoId, setPizzaEditandoId] = useState(null);
  const [bebidaEditandoId, setBebidaEditandoId] = useState(null);
  const [salvandoPizza, setSalvandoPizza] = useState(false);
  const [salvandoBebida, setSalvandoBebida] = useState(false);
  const [imgPizzaKey, setImgPizzaKey] = useState(0);
  const [imgBebidaKey, setImgBebidaKey] = useState(0);
  const [erroPizza, setErroPizza] = useState('');
  const [erroBebida, setErroBebida] = useState('');
  const [errosPizza, setErrosPizza] = useState({});
  const [errosBebida, setErrosBebida] = useState({});
  const [erroImgPizza, setErroImgPizza] = useState('');
  const [erroImgBebida, setErroImgBebida] = useState('');

  function validarPizza() {
    const e = {};
    if (!novaPizza.nome.trim()) e.nome = 'Nome obrigatório.';
    if (!novaPizza.valor.trim()) e.valor = 'Valor obrigatório.';
    else if (moedaParaNumero(novaPizza.valor) <= 0) e.valor = 'Informe um valor válido.';
    return e;
  }

  function validarBebida() {
    const e = {};
    if (!novaBebida.nome.trim()) e.nome = 'Nome obrigatório.';
    if (!novaBebida.valor.trim()) e.valor = 'Valor obrigatório.';
    else if (moedaParaNumero(novaBebida.valor) <= 0) e.valor = 'Informe um valor válido.';
    return e;
  }

  useEffect(() => {
    apiJson('/pizzas').then(setPizzas);
    apiJson('/bebidas').then(setBebidas);
  }, []);

  function limparFormularioPizza() {
    setNovaPizza({ ...FORM_PIZZA_VAZIO });
    setPizzaEditandoId(null);
    setErrosPizza({});
    setErroPizza('');
    setErroImgPizza('');
    setImgPizzaKey((k) => k + 1);
  }

  function limparFormularioBebida() {
    setNovaBebida({ ...FORM_BEBIDA_VAZIO });
    setBebidaEditandoId(null);
    setErrosBebida({});
    setErroBebida('');
    setErroImgBebida('');
    setImgBebidaKey((k) => k + 1);
  }

  function iniciarEdicaoPizza(pizza) {
    const { imagem, imagemNome } = imagemParaFormulario(pizza, obterImagemPizza);
    setPizzaEditandoId(pizza.id);
    setNovaPizza({
      nome: pizza.nome,
      descricao: pizza.descricao === 'Sem descrição' ? '' : (pizza.descricao || ''),
      valor: valorParaCampoMoeda(pizza.valor),
      imagem,
      imagemNome,
    });
    setErrosPizza({});
    setErroPizza('');
    setErroImgPizza('');
    setImgPizzaKey((k) => k + 1);
  }

  function iniciarEdicaoBebida(bebida) {
    const { imagem, imagemNome } = imagemParaFormulario(bebida, obterImagemBebida);
    setBebidaEditandoId(bebida.id);
    setNovaBebida({
      nome: bebida.nome,
      valor: valorParaCampoMoeda(bebida.valor),
      imagem,
      imagemNome,
    });
    setErrosBebida({});
    setErroBebida('');
    setErroImgBebida('');
    setImgBebidaKey((k) => k + 1);
  }

  function handleImagemPizza(dataUrl, nomeArquivo, erro) {
    setNovaPizza((p) => ({ ...p, imagem: dataUrl, imagemNome: nomeArquivo }));
    setErroImgPizza(erro);
  }

  function handleImagemBebida(dataUrl, nomeArquivo, erro) {
    setNovaBebida((b) => ({ ...b, imagem: dataUrl, imagemNome: nomeArquivo }));
    setErroImgBebida(erro);
  }

  function tratarErroApi(mensagem, setErros, setErroGeral) {
    if (!mensagem) {
      setErroGeral('Não foi possível salvar.');
      return;
    }
    const texto = mensagem.toLowerCase();
    if (texto.includes('nome') || texto.includes('cadastrad')) {
      setErros({ nome: mensagem });
      setErroGeral('');
      return;
    }
    setErroGeral(mensagem);
  }

  async function salvarPizza() {
    if (salvandoPizza) return;
    setErroPizza('');
    const e = validarPizza();
    if (Object.keys(e).length > 0) {
      setErrosPizza(e);
      return;
    }
    setErrosPizza({});
    setSalvandoPizza(true);

    const payload = {
      nome: novaPizza.nome.trim(),
      descricao: novaPizza.descricao.trim() || 'Sem descrição',
      valor: moedaParaNumero(novaPizza.valor),
      ativo: true,
    };
    if (novaPizza.imagem) {
      payload.imagem = novaPizza.imagem;
    }

    const editando = Boolean(pizzaEditandoId);
    const res = await apiFetch(editando ? `/pizzas/${pizzaEditandoId}` : '/pizzas', {
      method: editando ? 'PUT' : 'POST',
      body: JSON.stringify(payload),
    });

    setSalvandoPizza(false);

    if (res.ok) {
      const pizza = await res.json();
      setPizzas((prev) => (editando
        ? prev.map((p) => (p.id === pizza.id ? pizza : p))
        : [...prev, pizza]));
      limparFormularioPizza();
      return;
    }

    const erro = await res.json().catch(() => ({}));
    tratarErroApi(
      erro.mensagem || (editando ? 'Não foi possível atualizar a pizza.' : 'Não foi possível cadastrar a pizza.'),
      setErrosPizza,
      setErroPizza,
    );
  }

  async function salvarBebida() {
    if (salvandoBebida) return;
    setErroBebida('');
    const e = validarBebida();
    if (Object.keys(e).length > 0) {
      setErrosBebida(e);
      return;
    }
    setErrosBebida({});
    setSalvandoBebida(true);

    const payload = {
      nome: novaBebida.nome.trim(),
      valor: moedaParaNumero(novaBebida.valor),
      ativo: true,
    };
    if (novaBebida.imagem) {
      payload.imagem = novaBebida.imagem;
    }

    const editando = Boolean(bebidaEditandoId);
    const res = await apiFetch(editando ? `/bebidas/${bebidaEditandoId}` : '/bebidas', {
      method: editando ? 'PUT' : 'POST',
      body: JSON.stringify(payload),
    });

    setSalvandoBebida(false);

    if (res.ok) {
      const bebida = await res.json();
      setBebidas((prev) => (editando
        ? prev.map((b) => (b.id === bebida.id ? bebida : b))
        : [...prev, bebida]));
      limparFormularioBebida();
      return;
    }

    const erro = await res.json().catch(() => ({}));
    tratarErroApi(
      erro.mensagem || (editando ? 'Não foi possível atualizar a bebida.' : 'Não foi possível cadastrar a bebida.'),
      setErrosBebida,
      setErroBebida,
    );
  }

  async function removerPizza(id) {
    if (pizzaEditandoId === id) limparFormularioPizza();
    await apiFetch(`/pizzas/${id}`, { method: 'DELETE' });
    setPizzas((prev) => prev.filter((p) => p.id !== id));
  }

  async function removerBebida(id) {
    if (bebidaEditandoId === id) limparFormularioBebida();
    await apiFetch(`/bebidas/${id}`, { method: 'DELETE' });
    setBebidas((prev) => prev.filter((b) => b.id !== id));
  }

  function handleSair() {
    localStorage.removeItem('adminLogado');
    window.location.href = '/admin/login';
  }

  return (
    <TemplateAdmin rotaAtual="/admin/cardapio" onSair={handleSair}>
      <div className="admin-cardapio">
        <div className="admin-cardapio__cabecalho aviso-claro">
          <Titulo texto="Cardápio" nivel={1} />
        </div>

        <section className="admin-cardapio__secao">
          <div className="admin-cardapio__painel aviso-claro">
            <Titulo texto={pizzaEditandoId ? 'Editar pizza' : 'Pizzas'} nivel={2} />
            <div className="admin-cardapio__form">
              <FormField id="nomePizza" label="Nome" valor={novaPizza.nome} onChange={(e) => setNovaPizza((p) => ({ ...p, nome: e.target.value }))} placeholder="Portuguesa" obrigatorio erro={errosPizza.nome} />
              <FormField id="descPizza" label="Descrição" valor={novaPizza.descricao} onChange={(e) => setNovaPizza((p) => ({ ...p, descricao: e.target.value }))} placeholder="Descrição da pizza..." />
              <FormField id="valorPizza" label="Valor" valor={novaPizza.valor} onChange={(e) => setNovaPizza((p) => ({ ...p, valor: e.target.value }))} placeholder="123,88" mascara="moeda" obrigatorio erro={errosPizza.valor} />
              <FormFieldArquivoImagem
                key={`imgPizza-${imgPizzaKey}`}
                id="imgPizza"
                label="Imagem"
                placeholder="Selecionar imagem..."
                nomeArquivo={novaPizza.imagemNome}
                preview={novaPizza.imagem}
                onImagemSelecionada={handleImagemPizza}
                erro={erroImgPizza}
              />
              <div className="admin-cardapio__form-acoes">
                <Botao
                  texto={pizzaEditandoId ? 'Salvar alterações' : 'Cadastrar pizza'}
                  variante="primario"
                  onClick={salvarPizza}
                  desabilitado={salvandoPizza}
                />
                {pizzaEditandoId && (
                  <Botao texto="Cancelar edição" variante="secundario" onClick={limparFormularioPizza} />
                )}
              </div>
            </div>
            {erroPizza && <Texto conteudo={erroPizza} tamanho="pequeno" />}
          </div>
          <Divisor />
          <div className="admin-cardapio__lista">
            {pizzas.map((pizza) => (
              <div
                key={pizza.id}
                className={`admin-cardapio__item ${pizzaEditandoId === pizza.id ? 'admin-cardapio__item--editando' : ''}`}
              >
                <div className="admin-cardapio__item-info">
                  <img
                    src={obterImagemPizza(pizza.nome, pizza.imagem)}
                    alt={pizza.nome}
                    className="admin-cardapio__miniatura"
                  />
                  <div>
                    <Texto conteudo={pizza.nome} />
                    <Texto conteudo={formatarMoeda(pizza.valor)} tamanho="pequeno" cor="secundario" />
                  </div>
                </div>
                <div className="admin-cardapio__item-acoes">
                  <Botao texto="Editar" variante="secundario" onClick={() => iniciarEdicaoPizza(pizza)} />
                  <Botao texto="Remover" variante="perigo" onClick={() => removerPizza(pizza.id)} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divisor margem="grande" />

        <section className="admin-cardapio__secao">
          <div className="admin-cardapio__painel aviso-claro">
            <Titulo texto={bebidaEditandoId ? 'Editar bebida' : 'Bebidas'} nivel={2} />
            <div className="admin-cardapio__form">
              <FormField id="nomeBebida" label="Nome" valor={novaBebida.nome} onChange={(e) => setNovaBebida((b) => ({ ...b, nome: e.target.value }))} placeholder="Coca-Cola" obrigatorio erro={errosBebida.nome} />
              <FormField id="valorBebida" label="Valor" valor={novaBebida.valor} onChange={(e) => setNovaBebida((b) => ({ ...b, valor: e.target.value }))} placeholder="7,00" mascara="moeda" obrigatorio erro={errosBebida.valor} />
              <FormFieldArquivoImagem
                key={`imgBebida-${imgBebidaKey}`}
                id="imgBebida"
                label="Imagem"
                placeholder="Selecionar imagem..."
                nomeArquivo={novaBebida.imagemNome}
                preview={novaBebida.imagem}
                onImagemSelecionada={handleImagemBebida}
                erro={erroImgBebida}
              />
              <div className="admin-cardapio__form-acoes">
                <Botao
                  texto={bebidaEditandoId ? 'Salvar alterações' : 'Cadastrar bebida'}
                  variante="primario"
                  onClick={salvarBebida}
                  desabilitado={salvandoBebida}
                />
                {bebidaEditandoId && (
                  <Botao texto="Cancelar edição" variante="secundario" onClick={limparFormularioBebida} />
                )}
              </div>
            </div>
            {erroBebida && <Texto conteudo={erroBebida} tamanho="pequeno" />}
          </div>
          <Divisor />
          <div className="admin-cardapio__lista">
            {bebidas.map((bebida) => (
              <div
                key={bebida.id}
                className={`admin-cardapio__item ${bebidaEditandoId === bebida.id ? 'admin-cardapio__item--editando' : ''}`}
              >
                <div className="admin-cardapio__item-info">
                  <img
                    src={obterImagemBebida(bebida.nome, bebida.imagem)}
                    alt={bebida.nome}
                    className="admin-cardapio__miniatura"
                  />
                  <div>
                    <Texto conteudo={bebida.nome} />
                    <Texto conteudo={formatarMoeda(bebida.valor)} tamanho="pequeno" cor="secundario" />
                  </div>
                </div>
                <div className="admin-cardapio__item-acoes">
                  <Botao texto="Editar" variante="secundario" onClick={() => iniciarEdicaoBebida(bebida)} />
                  <Botao texto="Remover" variante="perigo" onClick={() => removerBebida(bebida.id)} />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </TemplateAdmin>
  );
}

export default AdminCardapio;
