import { useState, useEffect } from "react";
import Navbar from "./Components";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";

export default function App() {
  const [page, setPage] = useState("home");
  const [cartCount, setCartCount] = useState(2);

  const navigate = (target) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setPage(target), 150);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <Navbar currentPage={page} onNavigate={navigate} cartCount={cartCount} />

      <div key={page} style={{ animation: "fadeIn 0.4s ease forwards" }}>
        {page === "home" && <Home onNavigate={navigate} />}
        {page === "collection" && <Collection onNavigate={navigate} />}
        {page === "product" && <ProductDetail onNavigate={navigate} />}
        {page === "checkout" && <Checkout onNavigate={navigate} />}
      </div>
    </div>
  );
}
