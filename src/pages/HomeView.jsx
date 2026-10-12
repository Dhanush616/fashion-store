import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getFeaturedProducts } from "../services/products";

export default function HomeView() {
  const featured = getFeaturedProducts(8);
  return (
    <>
      <div className="p-5 mb-4 bg-light rounded-3 border">
        <div className="container-fluid py-3">
          <h1 className="display-6 fw-bold">FashionStore — Wear Your Style</h1>
          <p className="col-md-8 fs-5">
            Browse the latest fashion catalogue, search & filter products, save
            favourites to your wishlist and checkout in seconds.
          </p>
          <Link className="btn btn-dark btn-lg" to="/catalogue">Shop Now</Link>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card text-bg-dark h-100">
            <div className="card-body">
              <h5>New Season Sale</h5>
              <p className="small">Up to 30% off selected styles.</p>
              <Link to="/catalogue" className="btn btn-sm btn-warning">Explore</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-bg-secondary h-100">
            <div className="card-body">
              <h5>Free Shipping</h5>
              <p className="small">On all orders over $100.</p>
              <Link to="/cart" className="btn btn-sm btn-light">View Cart</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border h-100">
            <div className="card-body">
              <h5>Wishlist Favourites</h5>
              <p className="small text-muted">Save products for later.</p>
              <Link to="/wishlist" className="btn btn-sm btn-outline-dark">Open Wishlist</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Featured Products</h4>
        <Link to="/catalogue" className="btn btn-sm btn-outline-dark">View all</Link>
      </div>
      <div className="row g-3">
        {featured.map((p) => (
          <div className="col-6 col-md-4 col-lg-3" key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </>
  );
}
