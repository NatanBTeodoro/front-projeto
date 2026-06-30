import '../atomosCSS/Logo.css';

function Logo({ tamanho = 'normal' }) {
  return (
    <span className={`logo logo--${tamanho}`}>
      <svg className="logo__icone" viewBox="0 0 24 24" aria-hidden="true">
        <path
          className="logo__fatia"
          d="M12 2C7.5 2 4 10.5 4 19c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2 0-8.5-3.5-17-8-17z"
        />
        <circle className="logo__bolinha" cx="9.5" cy="14" r="1.2" />
        <circle className="logo__bolinha" cx="13" cy="11" r="1" />
        <circle className="logo__bolinha" cx="15.5" cy="15.5" r="1.1" />
      </svg>
      Fogo & Lenha
    </span>
  );
}

export default Logo;
