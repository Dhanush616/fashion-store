import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { cartCount } from "../utils/calculations";

export default function Navbar() {
  const { items } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg fs-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand fs-brand" to="/">
          Fashion<span>Store</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/catalogue">Shop</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/wishlist">
                Wishlist{" "}
                <span className="badge rounded-pill text-bg-secondary">{wishlist.length}</span>
              </NavLink>
            </li>
          </ul>
          <div className="d-flex gap-2 align-items-center">
            {user ? (
              <>
                <span className="small fw-semibold">Hi, {user.name}</span>
                <button
                  className="btn btn-sm btn-outline-dark"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link className="btn btn-sm btn-outline-dark" to="/login">
                Login
              </Link>
            )}
            <Link className="btn btn-warning btn-sm fs-cart-btn" to="/cart">
              Cart<sup className="ms-1 fw-bold text-dark">{cartCount(items)}</sup>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
