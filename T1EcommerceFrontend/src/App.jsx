// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ProductCard } from "./components/ProductCard";
import { Cart } from "./components/Cart";
import Checkout from "./components/checkout";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <h1 className="text-3xl font-bold text-gray-900">QuickCart</h1>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 py-8">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      {loading ? (
                        <p>Loading products...</p>
                      ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="lg:col-span-1">
                      <Cart />
                    </div>
                  </div>
                }
              />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
