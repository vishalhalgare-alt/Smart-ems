export default function ActionButton({
  children,
  icon,
  variant = "secondary",
  className = "",
  ...props
}) {
  return (
    <button className={`action-button action-button--${variant} ${className}`} type="button" {...props}>
      {icon}
      <span>{children}</span>
    </button>
  );
}
