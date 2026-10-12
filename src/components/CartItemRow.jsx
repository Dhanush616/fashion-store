import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/calculations";

export default function CartItemRow({ item }) {
  const { updateQty, removeItem } = useCart();
  const p = item.product || {};
  const lineTotal = (p.price || 0) * item.qty;

  return (
    <div className="card mb-3">
      <div className="row g-0 align-items-center">
        <div className="col-md-2">
          <img src={p.image} alt={p.name} className="img-fluid rounded-start" style={{ height: 110, width: "100%", objectFit: "cover" }} />
        </div>
        <div className="col-md-6">
          <div className="card-body py-2">
            <h6 className="card-title mb-1">{p.name}</h6>
            <div className="small text-muted">
              {item.size && <>Size: {item.size} </>}
              {item.colour && <>• Colour: {item.colour}</>}
            </div>
            <div className="small">{formatPrice(p.price)} each</div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="btn-group btn-group-sm" role="group">
            <button className="btn btn-outline-secondary" onClick={() => updateQty(item.key, item.qty - 1)}>−</button>
            <span className="btn btn-light disabled">{item.qty}</span>
            <button className="btn btn-outline-secondary" onClick={() => updateQty(item.key, item.qty + 1)}>+</button>
          </div>
        </div>
        <div className="col-md-2 text-end pe-3">
          <div className="fw-bold">{formatPrice(lineTotal)}</div>
          <button className="btn btn-sm btn-link text-danger p-0" onClick={() => removeItem(item.key)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
