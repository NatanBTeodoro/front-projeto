export function mascararCpf(valor) {
  const nums = String(valor ?? '').replace(/\D/g, '').slice(0, 11);

  if (nums.length <= 3) return nums;
  if (nums.length <= 6) return `${nums.slice(0, 3)}.${nums.slice(3)}`;
  if (nums.length <= 9) return `${nums.slice(0, 3)}.${nums.slice(3, 6)}.${nums.slice(6)}`;
  return `${nums.slice(0, 3)}.${nums.slice(3, 6)}.${nums.slice(6, 9)}-${nums.slice(9)}`;
}

export function cpfValido(cpf) {
  return String(cpf ?? '').replace(/\D/g, '').length === 11;
}

export function formatarCpfExibicao(cpf) {
  if (!cpf) return '';
  return mascararCpf(cpf);
}

export function mascararMoedaInput(valor) {
  const nums = String(valor ?? '').replace(/\D/g, '');
  if (!nums) return '';

  const numero = Number(nums) / 100;
  return numero.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function moedaParaNumero(valor) {
  if (valor === null || valor === undefined || valor === '') return 0;
  if (typeof valor === 'number') return valor;

  const texto = String(valor).trim();
  const normalizado = texto.includes(',')
    ? texto.replace(/\./g, '').replace(',', '.')
    : texto;

  const numero = parseFloat(normalizado);
  return Number.isNaN(numero) ? 0 : numero;
}

export function formatarMoeda(valor) {
  return moedaParaNumero(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
