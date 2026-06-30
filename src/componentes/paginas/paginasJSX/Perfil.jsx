// paginas/paginasJSX/Perfil.jsx

import { useState, useEffect, useCallback } from 'react';
import TemplateAutenticado from '../../templates/templatesJSX/TemplateAutenticado';
import FormField from '../../moleculas/moleculasJSX/FormField';
import FormFieldSenha from '../../moleculas/moleculasJSX/FormFieldSenha';
import ListaEnderecos from '../../organismos/organismosJSX/ListaEnderecos';
import FormularioEndereco from '../../organismos/organismosJSX/FormularioEndereco';
import Titulo from '../../atomos/atomosJSX/Titulo';
import Texto from '../../atomos/atomosJSX/Texto';
import Botao from '../../atomos/atomosJSX/Botao';
import Divisor from '../../atomos/atomosJSX/Divisor';
import MensagemSucesso from '../../atomos/atomosJSX/MensagemSucesso';
import MensagemErro from '../../atomos/atomosJSX/MensagemErro';
import { apiFetch, apiJson } from '../../../services/api';
import { formatarCpfExibicao } from '../../../utils/formatacao';
import { marcarRedirecionamentoVisitante } from '../../../utils/sessaoCliente';
import '../paginasCSS/Perfil.css';

function Perfil() {
  const clienteId = localStorage.getItem('clienteId');

  const [cliente, setCliente] = useState(null);
  const [enderecos, setEnderecos] = useState([]);
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [erroEndereco, setErroEndereco] = useState('');
  const [erros, setErros] = useState({});
  const [modoEndereco, setModoEndereco] = useState(null);
  const [enderecoEditando, setEnderecoEditando] = useState(null);
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);
  const [erroExclusao, setErroExclusao] = useState('');

  const carregarEnderecos = useCallback(async () => {
    const lista = await apiJson(`/clientes/${clienteId}/enderecos`);
    setEnderecos(lista);
  }, [clienteId]);

  useEffect(() => {
    async function carregarDados() {
      const dadosCliente = await apiJson(`/clientes/${clienteId}`);
      setCliente(dadosCliente);
      setUsuario(dadosCliente.usuario);
      await carregarEnderecos();
    }
    carregarDados();
  }, [clienteId, carregarEnderecos]);

  async function handleSalvarAcesso() {
    const e = {};
    if (!usuario.trim()) e.usuario = 'Usuário obrigatório.';
    if (senha && senha.length < 6) e.senha = 'Mínimo 6 caracteres.';
    if (senha && senha !== confirmarSenha) e.confirmarSenha = 'As senhas não coincidem.';
    if (Object.keys(e).length > 0) { setErros(e); return; }

    const payload = { usuario };
    if (senha) payload.senha = senha;

    const response = await apiFetch(`/clientes/${clienteId}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const erro = await response.json().catch(() => ({}));
      setErros({ usuario: erro.mensagem || 'Não foi possível salvar.' });
      return;
    }

    setErros({});
    setSenha('');
    setConfirmarSenha('');
    setSucesso('Alterações salvas com sucesso!');
    setTimeout(() => setSucesso(''), 3000);
  }

  function handleAdicionarEndereco() {
    setErroEndereco('');
    setEnderecoEditando(null);
    setModoEndereco('novo');
  }

  function handleEditarEndereco(endereco) {
    setErroEndereco('');
    setEnderecoEditando(endereco);
    setModoEndereco('editar');
  }

  function handleCancelarEndereco() {
    setModoEndereco(null);
    setEnderecoEditando(null);
    setErroEndereco('');
  }

  async function handleSalvarEndereco(dados) {
    setErroEndereco('');
    const url = modoEndereco === 'editar' && enderecoEditando
      ? `/clientes/${clienteId}/enderecos/${enderecoEditando.id}`
      : `/clientes/${clienteId}/enderecos`;

    const response = await apiFetch(url, {
      method: modoEndereco === 'editar' ? 'PUT' : 'POST',
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const erro = await response.json().catch(() => ({}));
      setErroEndereco(erro.mensagem || 'Não foi possível salvar o endereço.');
      return;
    }

    await carregarEnderecos();
    handleCancelarEndereco();
    setSucesso('Endereço salvo com sucesso!');
    setTimeout(() => setSucesso(''), 3000);
  }

  async function handleRemoverEndereco(enderecoId) {
    setErroEndereco('');
    const response = await apiFetch(`/clientes/${clienteId}/enderecos/${enderecoId}`, { method: 'DELETE' });
    if (!response.ok) {
      const erro = await response.json().catch(() => ({}));
      setErroEndereco(erro.mensagem || 'Não foi possível remover o endereço.');
      return;
    }
    await carregarEnderecos();
    if (enderecoEditando?.id === enderecoId) handleCancelarEndereco();
  }

  function handleSair() {
    localStorage.removeItem('clienteId');
    localStorage.removeItem('clienteNome');
    window.location.href = '/login';
  }

  async function handleExcluirConta() {
    setErroExclusao('');
    const response = await apiFetch(`/clientes/${clienteId}`, { method: 'DELETE' });
    if (!response.ok) {
      const erro = await response.json().catch(() => ({}));
      setErroExclusao(erro.mensagem || 'Não foi possível excluir a conta.');
      return;
    }
    marcarRedirecionamentoVisitante();
    window.location.replace('/');
  }

  if (!cliente) return <TemplateAutenticado><Texto conteudo="Carregando..." /></TemplateAutenticado>;

  return (
    <TemplateAutenticado rotaAtual="/perfil" onSair={handleSair}>
      <div className="perfil">

        <section className="perfil__secao">
          <Titulo texto="Meus Dados" nivel={2} />
          <div className="perfil__info">
            <Texto conteudo={`Nome: ${cliente.nomeCompleto}`} />
            <Texto conteudo={`CPF: ${formatarCpfExibicao(cliente.cpf)}`} />
            <Texto conteudo={`Cadastrado em: ${new Date(cliente.dataCadastro).toLocaleDateString('pt-BR')}`} cor="secundario" tamanho="pequeno" />
          </div>
        </section>

        <Divisor />

        <section className="perfil__secao">
          <Titulo texto="Editar Acesso" nivel={2} />
          <div className="perfil__campos">
            <FormField id="usuario" label="Usuário" valor={usuario} onChange={(e) => setUsuario(e.target.value)} obrigatorio erro={erros.usuario} />
            <FormFieldSenha id="senha" label="Nova senha" valor={senha} onChange={(e) => setSenha(e.target.value)} erro={erros.senha} />
            <FormFieldSenha id="confirmarSenha" label="Confirmar nova senha" valor={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} erro={erros.confirmarSenha} />
          </div>
          <Botao texto="Salvar acesso" variante="primario" onClick={handleSalvarAcesso} />
        </section>

        <Divisor />

        <section className="perfil__secao">
          <ListaEnderecos
            enderecos={enderecos}
            onEditar={handleEditarEndereco}
            onRemover={handleRemoverEndereco}
            onAdicionar={handleAdicionarEndereco}
          />

          {modoEndereco && (
            <FormularioEndereco
              titulo={modoEndereco === 'editar' ? 'Editar endereço' : 'Novo endereço'}
              enderecoInicial={enderecoEditando || { principal: enderecos.length === 0 }}
              onSalvar={handleSalvarEndereco}
              onCancelar={handleCancelarEndereco}
            />
          )}

          {erroEndereco && <MensagemErro mensagem={erroEndereco} />}
          <MensagemSucesso mensagem={sucesso} />
        </section>

        <Divisor />

        <section className="perfil__secao perfil__secao--perigo">
          <Titulo texto="Excluir conta" nivel={2} />
          <Texto
            conteudo="Ao excluir sua conta, todos os seus dados, endereços e histórico de pedidos serão removidos permanentemente."
            tamanho="pequeno"
            cor="secundario"
          />
          {!confirmarExclusao ? (
            <Botao texto="Excluir minha conta" variante="perigo" onClick={() => setConfirmarExclusao(true)} />
          ) : (
            <div className="perfil__excluir-confirmacao">
              <div className="aviso-claro">
                <Texto conteudo="Tem certeza? Esta ação não pode ser desfeita." />
              </div>
              {erroExclusao && <MensagemErro mensagem={erroExclusao} />}
              <div className="perfil__excluir-acoes">
                <Botao texto="Sim, excluir conta" variante="perigo" onClick={handleExcluirConta} />
                <Botao texto="Cancelar" variante="secundario" onClick={() => setConfirmarExclusao(false)} />
              </div>
            </div>
          )}
        </section>

      </div>
    </TemplateAutenticado>
  );
}

export default Perfil;
