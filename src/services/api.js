// services/api.js
//
// Centraliza a URL base e requisições ao back-end Spring Boot.

export const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export async function apiFetch(caminho, opcoes = {}) {
  const headers = { 'Content-Type': 'application/json', ...opcoes.headers };
  const resposta = await fetch(`${API_BASE}${caminho}`, { ...opcoes, headers });
  return resposta;
}

export async function apiJson(caminho, opcoes = {}) {
  const resposta = await apiFetch(caminho, opcoes);
  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}));
    throw new Error(erro.mensagem || 'Erro na requisição.');
  }
  if (resposta.status === 204) return null;
  return resposta.json();
}
