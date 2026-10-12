import { createContext, useContext, useMemo, useState, useEffect } from "react";

const CartContext = createContext(null);

function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readLS("fs_cart", []));

  useEffect(() => {
    try {
      localStorage.setItem("fs_cart", JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const addToCart = (product, qty = 1, variant = {}) => {
    if (!product || product.stock === 0) return;
    const key = `${product.id}_${variant.size || ""}_${variant.colour || ""}`;
    setItems((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: Math.min(i.qty + qty, product.stock || 99) } : i
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          product,
          qty,
          size: variant.size || product.sizes?.[0] || "One Size",
          colour: variant.colour || product.colours?.[0] || "",
        },
      ];
    });
  };

  const updateQty = (key, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty } : i))
    );
  };

  const removeItem = (key) => setItems((prev) => prev.filter((i) => i.key !== key));
  const clearCart = () => setItems([]);

  const value = useMemo(
    () => ({ items, addToCart, updateQty, removeItem, clearCart }),
    [items]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
