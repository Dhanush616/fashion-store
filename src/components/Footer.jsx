import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between gap-3">
        <div>
          <strong>FashionStore</strong>
          <div className="small text-secondary">Simple responsive fashion shopping demo built with React.</div>
          <div className="small text-secondary">Team: Umar • Dhanush • Evan</div>
        </div>
        <div className="d-flex gap-3 small">
          <Link className="link-light" to="/">Home</Link>
          <Link className="link-light" to="/catalogue">Shop</Link>
          <Link className="link-light" to="/cart">Cart</Link>
          <Link className="link-light" to="/wishlist">Wishlist</Link>
        </div>
      </div>
    </footer>
  );
}
