import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import HomeView from "./pages/HomeView";
import CatalogueView from "./pages/CatalogueView";
import ProductDetailView from "./pages/ProductDetailView";
import CartView from "./pages/CartView";
import WishlistView from "./pages/WishlistView";
import LoginView from "./pages/LoginView";
import CheckoutView from "./pages/CheckoutView";
import SuccessView from "./pages/SuccessView";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
          <Navbar />
          <main className="container py-4" style={{ minHeight: "75vh" }}>
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/catalogue" element={<CatalogueView />} />
              <Route path="/product/:id" element={<ProductDetailView />} />
              <Route path="/cart" element={<CartView />} />
                <Route path="/wishlist" element={<WishlistView />} />
                <Route path="/login" element={<LoginView />} />
              <Route path="/checkout" element={<CheckoutView />} />
              <Route path="/success" element={<SuccessView />} />
              <Route path="*" element={<div className="alert alert-warning">Page not found.</div>} />
            </Routes>
          </main>
          <Footer />
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
