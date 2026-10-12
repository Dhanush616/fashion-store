import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../services/products";
import { formatPrice } from "../utils/calculations";

export default function WishlistView() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const saved = PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (saved.length === 0) {
    return (
      <div className="fs-empty text-center py-5 px-3 mx-auto" style={{ maxWidth: 520 }}>
        <div className="fs-eyebrow">Saved</div>
        <h3 className="mt-1">Your wishlist is empty</h3>
        <p className="text-muted">Save products for later by tapping ♡ on any product.</p>
        <Link to="/catalogue" className="btn btn-dark">Discover Products</Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <div className="fs-eyebrow">Saved</div>
        <h2 className="mt-1">Wishlist ({saved.length})</h2>
      </div>
      <div className="row g-4">
        {saved.map((p) => (
          <div className="col-6 col-md-4 col-lg-3" key={p.id}>
            <div className="card h-100 fs-product-card">
              <div className="fs-img-wrap">
                <Link to={`/product/${p.id}`}>
                  <img src={p.image} alt={p.name} loading="lazy" />
                </Link>
              </div>
              <div className="card-body d-flex flex-column">
                <div className="fs-eyebrow-sm mb-1">{p.category}</div>
                <h6 className="fs-product-title">{p.name}</h6>
                <div className="fs-price mb-3">{formatPrice(p.price)}</div>
                <div className="mt-auto d-grid gap-2">
                  <button className="btn btn-sm btn-dark" disabled={p.stock === 0} onClick={() => { addToCart(p, 1); removeFromWishlist(p.id); }}>
                    {p.stock === 0 ? "Out of Stock" : "Move to Cart"}
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromWishlist(p.id)}>Remove</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
