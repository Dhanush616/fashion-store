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
