import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { PRODUCTS } from "../services/products";
import { useDebounce } from "../hooks/useHelpers";

export default function CatalogueView() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const debouncedSearch = useDebounce(search, 250);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    const q = debouncedSearch.trim().toLowerCase();
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q));
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [debouncedSearch, category, sort]);

  return (
    <>
      <div className="mb-4">
        <div className="fs-eyebrow">Catalogue</div>
        <h2 className="mt-1">Shop all products</h2>
      </div>
      <div className="row g-4">
        <div className="col-md-3">
          <FilterSidebar category={category} setCategory={setCategory} sort={sort} setSort={setSort} />
        </div>
        <div className="col-md-9">
          <div className="d-flex flex-column flex-md-row gap-2 mb-3">
            <div className="fs-searchbar flex-grow-1">
              <span className="fs-search-icon">⌕</span>
              <input
                className="form-control"
                placeholder="Search products by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select className="form-select" style={{ maxWidth: 230 }} value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <p className="text-muted small">
            Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            {category !== "All" && <> in <strong>{category}</strong></>}
            {debouncedSearch && <> matching “<strong>{debouncedSearch}</strong>”</>}
          </p>

          {filtered.length === 0 ? (
            <div className="alert alert-info">
              No products match your search/filter. Try clearing filters or a different search term.
            </div>
          ) : (
            <div className="row g-4">
              {filtered.map((p) => (
                <div className="col-6 col-lg-4" key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
