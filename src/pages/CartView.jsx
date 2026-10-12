import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItemRow from "../components/CartItemRow";
import { calcTotals, formatPrice } from "../utils/calculations";

export default function CartView() {
  const { items, clearCart } = useCart();
  const { subtotal, tax, shipping, total } = calcTotals(items);

  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <h3>Your cart is empty</h3>
        <p className="text-muted">Looks like you haven’t added anything yet.</p>
        <Link to="/catalogue" className="btn btn-dark">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="row g-4">
      <div className="col-md-8">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Shopping Cart ({items.length})</h4>
          <button className="btn btn-sm btn-outline-danger" onClick={clearCart}>Clear cart</button>
        </div>
        {items.map((it) => (
          <CartItemRow key={it.key} item={it} />
        ))}
      </div>
      <div className="col-md-4">
        <div className="card p-3 shadow-sm">
          <h5>Order Summary</h5>
          <div className="d-flex justify-content-between small"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="d-flex justify-content-between small"><span>Tax (8%)</span><span>{formatPrice(tax)}</span></div>
          <div className="d-flex justify-content-between small"><span>Shipping</span><span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
          <hr />
          <div className="d-flex justify-content-between fw-bold"><span>Total</span><span>{formatPrice(total)}</span></div>
          <Link to="/checkout" className="btn btn-dark w-100 mt-3">Proceed to Checkout</Link>
          <Link to="/catalogue" className="btn btn-link btn-sm">Continue shopping</Link>
        </div>
      </div>
    </div>
  );
}
