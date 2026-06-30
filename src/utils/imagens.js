import imagemFundo from '../images/imagem de fundo.jpg';
import base from '../images/base.webp';
import agua from '../images/agua.webp';
import coca from '../images/coca.webp';
import suco from '../images/suco.webp';
import portuguesa from '../images/portuguesa.webp';
import calabreza from '../images/calabreza.webp';
import quatroqueijos from '../images/quatroqueijos.webp';
import chocolate from '../images/chocolate.webp';
import chocolateBranco from '../images/chocolate branco.webp';
import charge from '../images/charge.webp';

export { imagemFundo, base };

function normalizar(texto) {
  return texto
    ?.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\.(webp|jpg|jpeg|png)$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const mapaImagens = {
  base,
  agua,
  coca,
  'coca cola': coca,
  'coca-cola': coca,
  suco,
  'suco de uva': suco,
  'suco natural': suco,
  portuguesa,
  calabresa: calabreza,
  calabreza,
  'quatro queijos': quatroqueijos,
  quatroqueijos,
  'quatro-queijos': quatroqueijos,
  chocolate,
  'chocolate preto': chocolate,
  'chocolate branco': chocolateBranco,
  'chocolate branco com morangos': chocolateBranco,
  'chocolate-branco': chocolateBranco,
  charge,
};

export function obterImagem(slugOuNome, nomeAlternativo) {
  const valor = String(slugOuNome ?? '').trim();
  if (valor.startsWith('data:') || valor.startsWith('http://') || valor.startsWith('https://')) {
    return valor;
  }

  const chave = normalizar(valor || nomeAlternativo);
  if (chave && mapaImagens[chave]) {
    return mapaImagens[chave];
  }

  const chaveNome = normalizar(nomeAlternativo);
  if (chaveNome && mapaImagens[chaveNome]) {
    return mapaImagens[chaveNome];
  }

  return base;
}

export function obterImagemPizza(nome, slugApi) {
  return obterImagem(slugApi, nome);
}

export function obterImagemBebida(nome, slugApi) {
  return obterImagem(slugApi, nome);
}
