const CHAVE_FORCAR_VISITANTE = 'forcarVisitante';

export function marcarRedirecionamentoVisitante() {
  sessionStorage.setItem(CHAVE_FORCAR_VISITANTE, '1');
}

export function aplicarSessaoVisitante() {
  if (sessionStorage.getItem(CHAVE_FORCAR_VISITANTE) !== '1') {
    return false;
  }
  sessionStorage.removeItem(CHAVE_FORCAR_VISITANTE);
  localStorage.removeItem('clienteId');
  localStorage.removeItem('clienteNome');
  return true;
}

export function limparSessaoCliente() {
  localStorage.removeItem('clienteId');
  localStorage.removeItem('clienteNome');
}
