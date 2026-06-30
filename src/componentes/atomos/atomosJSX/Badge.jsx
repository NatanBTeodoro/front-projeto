import '../atomosCSS/Badge.css';

const config = {
  CASA: { label: 'Casa' },
  TRABALHO: { label: 'Trabalho' },
  OUTRO: { label: 'Outro' },
};

function Badge({ rotulo }) {
  const { label } = config[rotulo] ?? config.OUTRO;

  return (
    <span className={`badge badge--${rotulo.toLowerCase()}`}>
      {label}
    </span>
  );
}

export default Badge;
