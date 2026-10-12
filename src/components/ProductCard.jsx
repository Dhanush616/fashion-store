import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatPrice } from "../utils/calculations";

function Stars({ rating }) {
  const full = Math.round(rating);
  return <span className="text-warning">{"★".repeat(full)}{"☆".repeat(5 - full)} <small className="text-muted">({rating})</small></span>;
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wished = isWishlisted(product.id);
  const out = product.stock === 0;

  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/product/${product.id}`} className="text-decoration-none">
        <img src={product.image} className="card-img-top" alt={product.name} style={{ height: 220, objectFit: "cover" }} loading="lazy" />
      </Link>
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
            <h6 className="card-title mb-1">{product.name}</h6>
          </Link>
          <button
            className={`btn btn-sm ${wished ? "btn-danger" : "btn-outline-danger"}`}
            title="Wishlist"
            onClick={() => toggleWishlist(product.id)}
          >
            {wished ? "♥" : "♡"}
          </button>
        </div>
        <div className="small text-muted mb-1">{product.category} • {out ? <span className="text-danger">Out of stock</span> : <span className="text-success">In stock ({product.stock})</span>}</div>
        <Stars rating={product.rating} />
        <div className="fw-bold mt-2 mb-3">{formatPrice(product.price)}</div>
        <div className="mt-auto d-grid">
          <button
            className="btn btn-dark btn-sm"
            disabled={out}
            onClick={() => addToCart(product, 1)}
          >
            {out ? "Unavailable" : "Quick Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
