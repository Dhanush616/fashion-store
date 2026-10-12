import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="fs-footer mt-5 pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-5">
            <Link className="navbar-brand fs-brand" to="/">
              Fashion<span>Store</span>
            </Link>
            <p className="small mt-2 mb-1" style={{ maxWidth: 340 }}>
              A curated fashion shopping experience — browse the catalogue,
              save favourites and checkout in seconds.
            </p>
            <p className="small text-secondary mb-0">Team: Umar • Dhanush • Evan</p>
          </div>
          <div className="col-6 col-md-3">
            <div className="fs-eyebrow mb-2">Shop</div>
            <div className="d-flex flex-column gap-2 small">
              <Link to="/">Home</Link>
              <Link to="/catalogue">All Products</Link>
              <Link to="/wishlist">Wishlist</Link>
            </div>
          </div>
          <div className="col-6 col-md-4">
            <div className="fs-eyebrow mb-2">Your Order</div>
            <div className="d-flex flex-column gap-2 small">
              <Link to="/cart">Shopping Cart</Link>
              <Link to="/checkout">Checkout</Link>
            </div>
          </div>
        </div>
        <div className="fs-footer-bottom mt-4 pt-3 d-flex justify-content-between small">
          <span>© 2026 FashionStore</span>
          <span>React • Bootstrap • Vite</span>
        </div>
      </div>
    </footer>
  );
}
