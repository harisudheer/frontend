import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/NavigationBar";
import HomePage from "./components/HomePage";
import ProductDetail from "./components/ProductDetail";
import Login from "./components/Login";
import Cart from "./components/Cart";
import PaymentPage from "./components/PaymentPage";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailed from "./components/PaymentFailed";
import Footer from "./components/Footer";
import axios from "axios";

const AppContent = () => {
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartCount, setCartCount] = useState(0);
  const isLoggedIn = !!user;

  const navigate = useNavigate();
  const location = useLocation();

  const shouldHideHeaderFooter = useMemo(
    () => ["/login"].includes(location.pathname),
    [location.pathname]
  );

  const fetchCartCount = async (userId) => {
    try {
      const { data } = await axios.get("https://fakestoreapi.com/carts");
      const totalItems = data
        .filter((c) => c.userId === userId)
        .flatMap((c) => c.products)
        .reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchCartCount(storedUser.id);
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    fetchCartCount(userData.id);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setCartCount(0);
    navigate("/");
  };

  return (
    <>
      {!shouldHideHeaderFooter && (
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onCategoryChange={(cat) => {
            setSelectedCategory(cat);
            navigate("/");
          }}
          cartCount={cartCount}
        />
      )}

      <Routes>
        <Route path="/" element={ <HomePage selectedCategory={selectedCategory} isLoggedIn={isLoggedIn} /> } />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={ isLoggedIn ? ( <Cart updateCartCount={setCartCount} /> ) : ( <Login onLogin={handleLogin} /> ) } />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
      </Routes>

      {!shouldHideHeaderFooter && (
        <Footer onCategoryChange={(cat) => setSelectedCategory(cat)} />
      )}
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
