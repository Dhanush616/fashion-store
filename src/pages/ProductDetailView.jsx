import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatPrice } from "../utils/calculations";
import Button from "../components/Button";

export default function ProductDetailView() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [size, setSize] = useState(product?.sizes?.[0] || "");
  const [colour, setColour] = useState(product?.colours?.[0] || "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="alert alert-warning">
        Product not found. <Link to="/catalogue">Back to catalogue</Link>
      </div>
    );
  }

  const out = product.stock === 0;
  const wished = isWishlisted(product.id);

  const handleAdd = () => {
    addToCart(product, qty, { size, colour });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="row g-4">
      <div className="col-md-6">
        <img src={product.image} alt={product.name} className="img-fluid rounded border w-100" style={{ maxHeight: 520, objectFit: "cover" }} />
      </div>
      <div className="col-md-6">
        <Link to="/catalogue" className="small">← Back to catalogue</Link>
        <h2 className="mt-2">{product.name}</h2>
        <div className="text-warning">{"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))} <span className="text-muted small">({product.rating})</span></div>
        <h3 className="mt-2">{formatPrice(product.price)}</h3>
        <p className="small">
          Category: <span className="badge text-bg-secondary">{product.category}</span>{" "}
          {out ? <span className="badge text-bg-danger">Out of stock</span> : <span className="badge text-bg-success">In stock ({product.stock})</span>}
        </p>
        <p>{product.description}</p>

        {product.sizes?.length > 1 && (
          <div className="mb-3">
            <label className="form-label fw-semibold">Size</label>
            <div className="d-flex gap-2 flex-wrap">
              {product.sizes.map((s) => (
                <button key={s} className={`btn btn-sm ${size === s ? "btn-dark" : "btn-outline-dark"}`} onClick={() => setSize(s)}>{s}</button>
              ))}
            </div>
          </div>
        )}
        {product.colours?.length > 1 && (
          <div className="mb-3">
            <label className="form-label fw-semibold">Colour</label>
            <div className="d-flex gap-2 flex-wrap">
              {product.colours.map((c) => (
                <button key={c} className={`btn btn-sm ${colour === c ? "btn-dark" : "btn-outline-dark"}`} onClick={() => setColour(c)}>{c}</button>
              ))}
            </div>
          </div>
        )}

        <div className="d-flex align-items-center gap-2 mb-3">
          <label className="fw-semibold">Qty:</label>
          <div className="btn-group btn-group-sm">
            <button className="btn btn-outline-secondary" disabled={qty <= 1} onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <span className="btn btn-light disabled">{qty}</span>
            <button className="btn btn-outline-secondary" disabled={qty >= product.stock} onClick={() => setQty((q) => Math.min(product.stock, q + 1))}>+</button>
          </div>
        </div>

        <div className="d-flex gap-2">
          <Button variant="dark" disabled={out} onClick={handleAdd}>
            {out ? "Out of Stock" : added ? "Added ✓" : `Add to Cart — ${formatPrice(product.price * qty)}`}
          </Button>
          <Button variant={wished ? "danger" : "outline-danger"} onClick={() => toggleWishlist(product.id)}>
            {wished ? "♥ Wishlisted" : "♡ Wishlist"}
          </Button>
        </div>
      </div>
    </div>
  );
}
