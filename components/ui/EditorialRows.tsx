type Row = { title: string; text?: string };

export default function EditorialRows({ rows, start = 1, theme = 'light' }: { rows: Row[]; start?: number; theme?: 'light' | 'dark' }) {
  return (
    <div className={`editorialRows editorialRows--${theme}`}>
      {rows.map((row, index) => (
        <article className="editorialRow" key={`${row.title}-${index}`}>
          <span>{String(start + index).padStart(2, '0')}</span>
          <h3>{row.title}</h3>
          {row.text && <p>{row.text}</p>}
          <i>↗</i>
        </article>
      ))}
    </div>
  );
}
