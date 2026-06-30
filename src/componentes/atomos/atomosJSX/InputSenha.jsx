import { useState } from 'react';
import Input from './Input';
import IconeOlho from './IconeOlho';
import '../atomosCSS/InputSenha.css';

function InputSenha({ id, valor, onChange, erro = false }) {
  const [visivel, setVisivel] = useState(false);

  return (
    <div className="input-senha">
      <Input
        id={id}
        tipo={visivel ? 'text' : 'password'}
        valor={valor}
        onChange={onChange}
        placeholder="••••••"
        erro={erro}
        autoComplete="current-password"
      />
      <button
        type="button"
        className="input-senha__toggle"
        onClick={() => setVisivel((v) => !v)}
        aria-label={visivel ? 'Esconder senha' : 'Mostrar senha'}
      >
        <IconeOlho aberto={visivel} />
      </button>
    </div>
  );
}

export default InputSenha;
