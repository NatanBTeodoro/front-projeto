function IconeOlho({ aberto = false }) {
  if (aberto) {
    return (
      <svg
        className="icone-olho"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  return (
    <svg
      className="icone-olho"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c5.5 0 9.1 4.36 9.8 7.24" />
      <path d="M6.2 6.2C3.2 8.2 2 12 2 12s2.2 5.8 7.8 7.8" />
      <path d="M14.1 14.1a3 3 0 0 1-4.2-4.2" />
      <path d="M2 2l20 20" />
    </svg>
  );
}

export default IconeOlho;
