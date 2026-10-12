import { createContext, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      const raw = localStorage.getItem("fs_wishlist");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("fs_wishlist", JSON.stringify(ids));
    } catch {
      /* ignore */
    }
  }, [ids]);

  const toggleWishlist = (productId) =>
    setIds((prev) => (prev.includes(productId) ? prev.filter((x) => x !== productId) : [...prev, productId]));

  const addToWishlist = (productId) => setIds((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
  const removeFromWishlist = (productId) => setIds((prev) => prev.filter((x) => x !== productId));
  const isWishlisted = (productId) => ids.includes(productId);

  const value = useMemo(
    () => ({ wishlist: ids, toggleWishlist, addToWishlist, removeFromWishlist, isWishlisted }),
    [ids]
  );
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
