import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatPrice } from "../utils/calculations";

function Stars({ rating }) {
  const full = Math.round(rating);
  return (
    <span className="fs-stars">
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}{" "}
      <small className="text-muted">({rating})</small>
    </span>
  );
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wished = isWishlisted(product.id);
  const out = product.stock === 0;

  return (
    <div className="card h-100 fs-product-card">
      <div className="fs-img-wrap">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        {out && <span className="fs-soldout">Sold out</span>}
        <button
          className="fs-wish-btn"
          title={wished ? "Remove from wishlist" : "Save to wishlist"}
          onClick={() => toggleWishlist(product.id)}
        >
          {wished ? "♥" : "♡"}
        </button>
      </div>
      <div className="card-body d-flex flex-column">
        <div className="fs-eyebrow-sm mb-1">{product.category}</div>
        <Link to={`/product/${product.id}`} className="text-decoration-none">
          <h6 className="fs-product-title mb-1">{product.name}</h6>
        </Link>
        <Stars rating={product.rating} />
        <div className="d-flex align-items-center justify-content-between mt-2 mb-3">
          <div className="fs-price">{formatPrice(product.price)}</div>
          {!out && (
            <small className="text-success fw-semibold">In stock</small>
          )}
        </div>
        <div className="mt-auto d-grid">
          <button
            className="btn btn-dark btn-sm"
            disabled={out}
            onClick={() => addToCart(product, 1)}
          >
            {out ? "Unavailable" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
