import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getFeaturedProducts, getProductById } from "../services/products";
import { formatPrice } from "../utils/calculations";

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

const TESTIMONIALS = [
  {
    quote: "The fit guide is spot on and delivery was super quick. My new favourite store!",
    name: "Priya S.",
    detail: "Verified buyer • Mumbai",
    featured: false,
  },
  {
    quote: "Loved the collection — premium quality at honest prices. Checkout took a minute!",
    name: "Rahul M.",
    detail: "Verified buyer • Delhi",
    featured: true,
  },
  {
    quote: "Wishlist + fast filters make shopping so easy. The boots are even better in person.",
    name: "Ananya K.",
    detail: "Verified buyer • Bengaluru",
    featured: false,
  },
];

function PromoCard({ productId, title }) {
  const p = getProductById(productId);
  if (!p) return null;
  return (
    <div className="fs-promo-card">
      <Link to={`/product/${p.id}`}>
        <img src={p.image} alt={p.name} loading="lazy" />
      </Link>
      <div className="fs-promo-body">
        <strong style={{ fontSize: "0.95rem", lineHeight: 1.3 }}>{title}</strong>
        <span className="fs-price" style={{ fontSize: "1rem" }}>{formatPrice(p.price)}</span>
        <Link to={`/product/${p.id}`} className="btn btn-dark btn-sm mt-auto align-self-start">
          Shop now
        </Link>
      </div>
    </div>
  );
}

export default function HomeView() {
  const featured = getFeaturedProducts(8);
  return (
    <>
      {/* ---- yellow lookbook hero ---- */}
      <section className="fs-hero-yellow p-4 p-lg-5 mb-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-5">
            <div className="fs-eyebrow mb-2" style={{ background: "rgba(255,255,255,.65)" }}>
              Lookout Show
            </div>
            <h1 className="mt-2">
              <span className="fs-marker">Fashion &</span>
              <br />
              Accessories
            </h1>
            <p className="fs-hero-sub my-3">
              Trendy fits, footwear and accessories at honest prices —
              free shipping over ₹999 and easy wishlist saving.
            </p>
            <div className="d-flex gap-2 flex-wrap">
              <Link className="btn btn-dark" to="/catalogue">Shop Now</Link>
              <Link className="btn btn-outline-dark" to="/wishlist">Wishlist</Link>
            </div>
            <div className="fs-hero-stats">
              <div><strong>16+</strong><span>Products</span></div>
              <div><strong>4.8★</strong><span>Avg rating</span></div>
              <div><strong>₹999+</strong><span>Free ship</span></div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="fs-hero-model">
              <img
                src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=700&q=80"
                alt="Model wearing floral summer dress"
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="row g-3">
              <div className="col-12">
                <PromoCard productId="p5" title="Lace up the sneaker collection" />
              </div>
              <div className="col-12">
                <PromoCard productId="p12" title="Carry the new handbag edit" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- explore collection ---- */}
      <div className="fs-section-head">
        <div>
          <div className="fs-eyebrow">Shop now</div>
          <h4>Explore Collection</h4>
        </div>
        <Link to="/catalogue" className="btn btn-sm btn-dark">View all</Link>
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

      {/* ---- featured products ---- */}
      <div className="fs-section-head">
        <div>
          <div className="fs-eyebrow">Handpicked</div>
          <h4>Featured Products</h4>
        </div>
        <Link to="/catalogue" className="btn btn-sm btn-outline-dark">View all</Link>
      </div>
      <div className="row g-4 mb-5">
        {featured.map((p) => (
          <div className="col-6 col-md-4 col-lg-3" key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {/* ---- testimonials ---- */}
      <div className="fs-section-head">
        <div>
          <div className="fs-eyebrow">Reviews</div>
          <h4>Testimonials</h4>
        </div>
      </div>
      <div className="row g-4">
        {TESTIMONIALS.map((t) => (
          <div className="col-md-4" key={t.name}>
            <div className={`fs-quote-card${t.featured ? " featured" : ""}`}>
              <div className="fs-stars mb-2">★★★★★</div>
              <p className="mb-3" style={{ fontSize: "0.95rem" }}>“{t.quote}”</p>
              <strong>{t.name}</strong>
              <div className="small opacity-75">{t.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
