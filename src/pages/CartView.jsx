import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItemRow from "../components/CartItemRow";
import { calcTotals, formatPrice } from "../utils/calculations";

export default function CartView() {
  const { items, clearCart } = useCart();
  const { subtotal, tax, shipping, total } = calcTotals(items);

  if (items.length === 0) {
    return (
      <div className="fs-empty text-center py-5 px-3 mx-auto" style={{ maxWidth: 520 }}>
        <div className="fs-eyebrow">Cart</div>
        <h3 className="mt-1">Your cart is empty</h3>
        <p className="text-muted">Looks like you haven’t added anything yet.</p>
        <Link to="/catalogue" className="btn btn-dark">Browse Products</Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <div className="fs-eyebrow">Your Bag</div>
        <h2 className="mt-1">Shopping cart ({items.length})</h2>
      </div>
      <div className="row g-4">
        <div className="col-md-8">
          {items.map((it) => (
            <CartItemRow key={it.key} item={it} />
          ))}
          <button className="btn btn-sm btn-outline-danger" onClick={clearCart}>Clear cart</button>
        </div>
        <div className="col-md-4">
          <div className="fs-summary p-4">
            <div className="fs-eyebrow mb-1">Summary</div>
            <h5 className="font-display">Order summary</h5>
            <div className="d-flex justify-content-between small mt-3"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="d-flex justify-content-between small"><span>Tax (8%)</span><span>{formatPrice(tax)}</span></div>
            <div className="d-flex justify-content-between small"><span>Shipping</span><span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5"><span>Total</span><span>{formatPrice(total)}</span></div>
            <Link to="/checkout" className="btn btn-warning w-100 mt-3">Proceed to Checkout</Link>
            <div className="text-center mt-2">
              <Link to="/catalogue" className="btn btn-link btn-sm text-light">Continue shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
