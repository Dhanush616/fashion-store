import { Link, useLocation } from "react-router-dom";
import { formatPrice } from "../utils/calculations";

export default function SuccessView() {
  const { state } = useLocation();
  const orderId = state?.orderId || JSON.parse(localStorage.getItem("fs_last_order") || "{}").id || "ORD-0000";
  const total = state?.total ?? JSON.parse(localStorage.getItem("fs_last_order") || "{}").total ?? 0;

  return (
    <div className="fs-empty text-center py-5 px-3 mx-auto" style={{ maxWidth: 560 }}>
      <div className="fs-eyebrow">Thank you</div>
      <h2 className="mt-1">Order placed successfully!</h2>
      <div className="fs-divider-gold" />
      <p className="text-muted mb-1">Order ID: <strong className="text-dark">{orderId}</strong></p>
      <p className="fs-price mb-1">Amount paid: {formatPrice(total)}</p>
      <p className="text-muted small">Thank you for shopping with FashionStore.</p>
      <div className="d-flex gap-2 justify-content-center mt-3 flex-wrap">
        <Link to="/catalogue" className="btn btn-dark">Continue Shopping</Link>
        <Link to="/" className="btn btn-outline-dark">Go Home</Link>
      </div>
    </div>
  );
}
