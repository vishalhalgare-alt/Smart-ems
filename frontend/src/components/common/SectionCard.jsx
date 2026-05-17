export default function SectionCard({ eyebrow, title, action, children, className = "" }) {
  return (
    <article className={`section-card ${className}`}>
      {(eyebrow || title || action) && (
        <header className="section-card__header">
          <div>
            {eyebrow && <p>{eyebrow}</p>}
            {title && <h2>{title}</h2>}
          </div>
          {action}
        </header>
      )}
      {children}
    </article>
  );
}
