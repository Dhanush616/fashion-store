export default function Input({ label, error, ...rest }) {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <input className={`form-control ${error ? "is-invalid" : ""}`} {...rest} />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
