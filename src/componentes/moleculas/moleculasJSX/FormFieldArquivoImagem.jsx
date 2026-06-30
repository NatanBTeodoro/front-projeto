import { useRef } from 'react';
import Label from '../../atomos/atomosJSX/Label';
import MensagemErro from '../../atomos/atomosJSX/MensagemErro';
import { lerArquivoComoDataUrl } from '../../../utils/imagemArquivo';
import '../moleculasCSS/FormFieldArquivoImagem.css';

const TAMANHO_MAXIMO_MB = 2;

function FormFieldArquivoImagem({
  id,
  label,
  placeholder = 'Selecionar imagem...',
  nomeArquivo = '',
  preview = '',
  onImagemSelecionada,
  erro = '',
  obrigatorio = false,
}) {
  const inputRef = useRef(null);

  async function handleChange(e) {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;

    if (!arquivo.type.startsWith('image/')) {
      onImagemSelecionada('', '', 'Selecione um arquivo de imagem (JPG, PNG ou WEBP).');
      return;
    }

    if (arquivo.size > TAMANHO_MAXIMO_MB * 1024 * 1024) {
      onImagemSelecionada('', '', `A imagem deve ter no máximo ${TAMANHO_MAXIMO_MB} MB.`);
      return;
    }

    try {
      const dataUrl = await lerArquivoComoDataUrl(arquivo);
      onImagemSelecionada(dataUrl, arquivo.name, '');
    } catch {
      onImagemSelecionada('', '', 'Não foi possível carregar a imagem.');
    }
  }

  function abrirSeletor() {
    inputRef.current?.click();
  }

  function handleTecla(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      abrirSeletor();
    }
  }

  return (
    <div className="form-field form-field-arquivo-imagem">
      <Label texto={label} htmlFor={id} obrigatorio={obrigatorio} />
      <div
        className={`form-field-arquivo-imagem__area input ${erro ? 'input--erro' : ''}`}
        onClick={abrirSeletor}
        onKeyDown={handleTecla}
        role="button"
        tabIndex={0}
        aria-label={nomeArquivo ? `${label}: ${nomeArquivo}` : placeholder}
      >
        <span
          className={
            nomeArquivo
              ? 'form-field-arquivo-imagem__texto'
              : 'form-field-arquivo-imagem__texto form-field-arquivo-imagem__texto--placeholder'
          }
        >
          {nomeArquivo || placeholder}
        </span>
      </div>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/*"
        className="form-field-arquivo-imagem__input"
        onChange={handleChange}
        tabIndex={-1}
      />
      {preview && (
        <img src={preview} alt="Pré-visualização" className="form-field-arquivo-imagem__preview" />
      )}
      <MensagemErro mensagem={erro} />
    </div>
  );
}

export default FormFieldArquivoImagem;
