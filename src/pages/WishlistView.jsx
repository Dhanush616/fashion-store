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
      <div className="text-center py-5">
        <h3>Your wishlist is empty</h3>
        <p className="text-muted">Save products for later by tapping ♡ on any product.</p>
        <Link to="/catalogue" className="btn btn-dark">Discover Products</Link>
      </div>
    );
  }

  return (
    <>
      <h4 className="mb-3">Saved Products ({saved.length})</h4>
      <div className="row g-3">
        {saved.map((p) => (
          <div className="col-6 col-md-4 col-lg-3" key={p.id}>
            <div className="card h-100 shadow-sm">
              <Link to={`/product/${p.id}`}>
                <img src={p.image} className="card-img-top" alt={p.name} style={{ height: 200, objectFit: "cover" }} />
              </Link>
              <div className="card-body d-flex flex-column">
                <h6>{p.name}</h6>
                <div className="fw-bold mb-2">{formatPrice(p.price)}</div>
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
