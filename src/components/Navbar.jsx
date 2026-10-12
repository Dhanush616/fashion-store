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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Fashion<span className="text-warning">Store</span>
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
                <span className="badge text-bg-secondary">{wishlist.length}</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                Cart{" "}
                <span className="badge text-bg-warning">{cartCount(items)}</span>
              </NavLink>
            </li>
          </ul>
          <div className="d-flex gap-2 align-items-center">
            {user ? (
              <>
                <span className="text-light small">Hi, {user.name}</span>
                <button
                  className="btn btn-sm btn-outline-light"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link className="btn btn-sm btn-outline-light" to="/login">
                Login
              </Link>
            )}
            <Link className="btn btn-sm btn-warning" to="/cart">
              Cart ({cartCount(items)})
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
