import { Link, useLocation } from "react-router-dom";
import { formatPrice } from "../utils/calculations";

export default function SuccessView() {
  const { state } = useLocation();
  const orderId = state?.orderId || JSON.parse(localStorage.getItem("fs_last_order") || "{}").id || "ORD-0000";
  const total = state?.total ?? JSON.parse(localStorage.getItem("fs_last_order") || "{}").total ?? 0;

  return (
    <div className="text-center py-5">
      <div className="display-4">✅</div>
      <h2 className="mt-2">Order Placed Successfully!</h2>
      <p className="text-muted">Order ID: <strong>{orderId}</strong></p>
      <p className="fw-bold">Amount Paid: {formatPrice(total)}</p>
      <p className="text-muted small">Thank you for shopping with FashionStore.</p>
      <div className="d-flex gap-2 justify-content-center">
        <Link to="/catalogue" className="btn btn-dark">Continue Shopping</Link>
        <Link to="/" className="btn btn-outline-dark">Go Home</Link>
      </div>
    </div>
  );
}
