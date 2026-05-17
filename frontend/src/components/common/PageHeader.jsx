export default function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <section className="page-header">
      <div>
        {eyebrow && <span>{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="page-header__actions">{actions}</div>}
    </section>
  );
}
