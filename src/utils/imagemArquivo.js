export function lerArquivoComoDataUrl(arquivo) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(arquivo);
    const imagem = new Image();

    imagem.onload = () => {
      URL.revokeObjectURL(url);

      const larguraMaxima = 800;
      let { width, height } = imagem;

      if (width > larguraMaxima) {
        height = Math.round((height * larguraMaxima) / width);
        width = larguraMaxima;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const contexto = canvas.getContext('2d');
      if (!contexto) {
        reject(new Error('Não foi possível processar a imagem.'));
        return;
      }

      contexto.drawImage(imagem, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.82));
    };

    imagem.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Não foi possível ler a imagem.'));
    };

    imagem.src = url;
  });
}

export function nomeArquivoImagem(arquivoOuUrl) {
  if (!arquivoOuUrl) return '';
  if (typeof arquivoOuUrl === 'string' && arquivoOuUrl.startsWith('data:')) {
    return 'imagem-selecionada';
  }
  return arquivoOuUrl.name || '';
}
