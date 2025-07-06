import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, CircularProgress, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cart = ({ updateCartCount }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data: carts } = await axios.get("https://fakestoreapi.com/carts");
        const userCarts = carts.filter((cart) => cart.userId === userId);
        const latestCart = userCarts[userCarts.length - 1];

        if (!latestCart) {
          setCartProducts([]);
          updateCartCount(0);
          return;
        }

        const productDetails = await Promise.all(
          latestCart.products.map((p) =>
            axios.get(`https://fakestoreapi.com/products/${p.productId}`)
          )
        );

        const detailedProducts = productDetails.map((res, index) => ({
          ...res.data,
          quantity: latestCart.products[index].quantity,
        }));

        setCartProducts(detailedProducts);

        const totalItems = latestCart.products.reduce((sum, p) => sum + p.quantity, 0);
        updateCartCount(totalItems);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setCartProducts([]);
        updateCartCount(0);
      } finally {
        setLoadingCart(false);
      }
    };

    if (userId) {
      fetchCart();
    } else {
      setLoadingCart(false);
      setCartProducts([]);
      updateCartCount(0);
    }
  }, [userId, updateCartCount]);

  if (loadingCart) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box px={3} py={4}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        🛒 Your Cart
      </Typography>

      {cartProducts.length === 0 ? (
        <Typography>No items in your cart.</Typography>
      ) : (
        cartProducts.map((item) => (
          <Box
            key={item.id}
            display="flex"
            gap={2}
            alignItems="center"
            p={2}
            sx={{ border: "1px solid #eee", borderRadius: 2, mb: 2 }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ width: 60, height: 60, objectFit: "contain" }}
            />
            <Box flex={1}>
              <Typography fontSize={14} fontWeight={500}>
                {item.title}
              </Typography>
              <Typography fontSize={13} color="text.secondary">
                ${item.price} × {item.quantity}
              </Typography>
            </Box>
            <Typography fontWeight={600}>
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Box>
        ))
      )}

      <Divider sx={{ my: 2 }} />

      {cartProducts.length > 0 && (
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" fontWeight={600}>
            Total:
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            $
            {cartProducts
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toFixed(2)}
          </Typography>
        </Box>
      )}

      <Box mt={3} textAlign="right">
       <Button
         variant="contained"
         color="primary"
         onClick={() => {
           const totalAmount = cartProducts.reduce(
             (sum, item) => sum + item.price * item.quantity,
             0
            );
          localStorage.setItem("cartTotal", totalAmount.toFixed(2));
          navigate("/payment");
         }}
        >
         Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
