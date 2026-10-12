export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`btn btn-${variant} ${className}`}
      {...rest}
    >
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
