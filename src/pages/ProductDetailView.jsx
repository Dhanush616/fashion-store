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
    <div className="row g-4 g-lg-5">
      <div className="col-md-6">
        <img src={product.image} alt={product.name} className="img-fluid w-100 fs-detail-img" style={{ maxHeight: 560, objectFit: "cover" }} />
      </div>
      <div className="col-md-6">
        <Link to="/catalogue" className="fs-crumb">← Back to catalogue</Link>
        <div className="d-flex gap-2 align-items-center mt-3 mb-1">
          <span className="fs-chip">{product.category}</span>
          {out
            ? <span className="badge rounded-pill text-bg-danger">Out of stock</span>
            : <span className="badge rounded-pill text-bg-success">In stock ({product.stock})</span>}
        </div>
        <h2 className="mt-1">{product.name}</h2>
        <div className="fs-stars">
          {"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))}{" "}
          <span className="text-muted small">({product.rating})</span>
        </div>
        <div className="fs-price mt-2" style={{ fontSize: "1.8rem" }}>{formatPrice(product.price)}</div>
        <p className="text-muted mt-2">{product.description}</p>

        {product.sizes?.length > 1 && (
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase text-muted">Size</label>
            <div className="d-flex gap-2 flex-wrap">
              {product.sizes.map((s) => (
                <button key={s} className={`btn btn-sm fs-opt ${size === s ? "btn-dark" : "btn-outline-dark"}`} onClick={() => setSize(s)}>{s}</button>
              ))}
            </div>
          </div>
        )}
        {product.colours?.length > 1 && (
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase text-muted">Colour</label>
            <div className="d-flex gap-2 flex-wrap">
              {product.colours.map((c) => (
                <button key={c} className={`btn btn-sm fs-opt ${colour === c ? "btn-dark" : "btn-outline-dark"}`} onClick={() => setColour(c)}>{c}</button>
              ))}
            </div>
          </div>
        )}

        <div className="d-flex align-items-center gap-3 mb-4">
          <label className="fw-semibold small text-uppercase text-muted">Qty</label>
          <div className="fs-qty" role="group" aria-label="Quantity">
            <button disabled={qty <= 1} onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
            <span>{qty}</span>
            <button disabled={qty >= product.stock} onClick={() => setQty((q) => Math.min(product.stock, q + 1))} aria-label="Increase quantity">+</button>
          </div>
        </div>

        <div className="d-flex gap-2 flex-wrap">
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
