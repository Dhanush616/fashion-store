import { useEffect, useRef, useState } from "react";

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function SortSelect({ sort, setSort }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = SORT_OPTIONS.find((o) => o.value === sort) || SORT_OPTIONS[0];

  useEffect(() => {
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="fs-sort" ref={ref}>
      <button
        type="button"
        className={`fs-sort-btn${open ? " open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{current.label}</span>
        <span className="fs-sort-chev">⌄</span>
      </button>
      {open && (
        <div className="fs-sort-menu" role="listbox">
          {SORT_OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              role="option"
              aria-selected={o.value === sort}
              className={`fs-sort-option${o.value === sort ? " active" : ""}`}
              onClick={() => {
                setSort(o.value);
                setOpen(false);
              }}
            >
              <span className="fs-sort-tick">{o.value === sort ? "●" : ""}</span>
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
