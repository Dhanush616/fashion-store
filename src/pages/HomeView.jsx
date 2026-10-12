import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getFeaturedProducts } from "../services/products";

const CATEGORY_TILES = [
  {
    name: "Women",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Men",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Footwear",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
  },
];

export default function HomeView() {
  const featured = getFeaturedProducts(8);
  return (
    <>
      <section className="fs-hero mb-5">
        <div className="fs-hero-inner">
          <div className="fs-eyebrow mb-2">New Season • 2026</div>
          <h1>
            Wear your <em>style</em>,<br />own every moment.
          </h1>
          <p className="my-3">
            Discover handpicked fashion essentials — search the catalogue,
            save favourites to your wishlist and checkout in seconds.
          </p>
          <div className="d-flex gap-2 flex-wrap">
            <Link className="btn btn-warning" to="/catalogue">Shop Now</Link>
            <Link className="btn btn-outline-light" to="/wishlist">Wishlist</Link>
          </div>
        </div>
      </section>

      <div className="fs-section-head">
        <div>
          <div className="fs-eyebrow">Categories</div>
          <h4>Shop by category</h4>
        </div>
      </div>
      <div className="row g-3 mb-5">
        {CATEGORY_TILES.map((c) => (
          <div className="col-6 col-md-3" key={c.name}>
            <Link to="/catalogue" className="fs-cat-tile">
              <img src={c.image} alt={c.name} loading="lazy" />
              <span>{c.name}</span>
            </Link>
          </div>
        ))}
      </div>

      <div className="fs-section-head">
        <div>
          <div className="fs-eyebrow">Handpicked</div>
          <h4>Featured products</h4>
        </div>
        <Link to="/catalogue" className="btn btn-sm btn-outline-dark">View all</Link>
      </div>
      <div className="row g-4">
        {featured.map((p) => (
          <div className="col-6 col-md-4 col-lg-3" key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </>
  );
}
