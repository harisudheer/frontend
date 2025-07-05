import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";

const HomePage = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    Object.entries(cartItems).forEach(([id, item]) => {
      if (item.inCart && item.quantity > 0) {
        axios.post("https://fakestoreapi.com/carts", {
          userId: 1,
          date: new Date().toISOString(),
          products: [{ productId: Number(id), quantity: item.quantity }],
        }).then(res => console.log("Synced:", res.data));
      }
    });
  }, [cartItems]);

  const toggleCartItem = (productId) => {
    setCartItems(prev => {
      if (prev[productId]?.inCart) return prev;
      return {
        ...prev,
        [productId]: { inCart: true, quantity: 1, added: false },
      };
    });
  };

  const updateQuantity = (productId, increment) => {
    setCartItems(prev => {
      const currentQty = prev[productId]?.quantity || 0;
      const newQty = Math.max(0, currentQty + increment);
      return {
        ...prev,
        [productId]: {
          ...prev[productId],
          quantity: newQty,
          inCart: newQty > 0,
        },
      };
    });
  };

  const handleAddToCartSubmit = async (productId) => {
    const item = cartItems[productId];
    if (!item || item.quantity <= 0) return;

    try {
      const res = await axios.post("https://fakestoreapi.com/carts", {
        userId: 1,
        date: new Date().toISOString(),
        products: [{ productId, quantity: item.quantity }],
      });
      console.log("Cart submitted:", res.data);
      setCartItems(prev => ({
        ...prev,
        [productId]: { ...prev[productId], added: true },
      }));
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const categories = [...new Set(products.map(item => item.category))];
  const filteredCategories = selectedCategory === "Products" || selectedCategory === "all" ? categories : categories.filter(cat => cat === selectedCategory);

  const getCategoryTitle = cat => cat.charAt(0).toUpperCase() + cat.slice(1);
  const getProductsByCategory = cat => products.filter(item => item.category === cat);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box px={2} py={1}>
      {filteredCategories.map((category) => (
        <Box key={category} mb={5}>
          <Typography variant="h6" fontWeight={600} mb={2}>
            {getCategoryTitle(category)}
          </Typography>

          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 1,
              pb: 1,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {getProductsByCategory(category).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cartItem={cartItems[product.id]}
                navigate={navigate}
                toggleCartItem={toggleCartItem}
                updateQuantity={updateQuantity}
                handleAddToCartSubmit={handleAddToCartSubmit}
              />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default HomePage;
