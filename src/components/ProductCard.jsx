import React from "react";
import { Box, Typography, Card, CardMedia, CardContent, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

const ProductCard = ({ product, cartItem, navigate, toggleCartItem, updateQuantity, handleAddToCartSubmit }) => {
  const { id, image, title, price, rating } = product;
  const inCart = cartItem?.inCart;
  const quantity = cartItem?.quantity || 0;
  const added = cartItem?.added;

  return (
    <Box
      key={id}
      onClick={() => navigate(`/product/${id}`)}
      sx={{
        minWidth: 220, maxWidth: 220, borderRadius: 3, boxShadow: 3, cursor: "pointer",
        position: "relative", flexShrink: 0, backgroundColor: "#fff",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s",
        "&:hover": { transform: "scale(1.02)", boxShadow: 6 }
      }}
    >
      <IconButton
        sx={{
          position: "absolute", top: 8, right: 8, backgroundColor: "#ffffffdd",
          zIndex: 2, boxShadow: 1, "&:hover": { backgroundColor: "#e3f2fd" }
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (!inCart) toggleCartItem(id);
        }}
      >
        {inCart ? <CheckIcon sx={{ color: "green", fontSize: 20 }} /> : <AddIcon sx={{ color: "black", fontSize: 20 }} />}
      </IconButton>

      <Card sx={{ borderRadius: 4, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <CardMedia component="img" image={image} alt={title} sx={{ height: 150, objectFit: "contain", bgcolor: "#f5f5f5", p: 1 }} />
        <CardContent sx={{ p: 2 }}>
          <Typography variant="body2" fontWeight={500} sx={{
            fontSize: 13, lineHeight: 1.3, height: 36, overflow: "hidden",
            display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2
          }}>
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary">${price}</Typography>

          <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
            <Typography fontSize={11} variant="body2" color="text.secondary">⭐ {rating?.rate}</Typography>
            <Typography fontSize={11} variant="body2" color="text.secondary">({rating?.count})</Typography>
          </Box>

          {inCart && (
            <Box onClick={(e) => e.stopPropagation()} mt={1} px={1} pb={1} sx={{ borderTop: "1px solid #eee", bgcolor: "#fafafa" }}>
              <Box display="flex" justifyContent="center" alignItems="center" gap={1} sx={{ boxShadow: 1, p: 0.5, bgcolor: "#fff", borderRadius: "10px" }}>
                <IconButton size="small" onClick={() => updateQuantity(id, -1)} sx={{ color: "#1976d2", border: "1px solid #ccc", fontSize: 14, borderRadius: "50%", p: "2px" }}>–</IconButton>
                <Typography fontWeight={500}>{quantity}</Typography>
                <IconButton size="small" onClick={() => updateQuantity(id, 1)} sx={{ color: "#1976d2", border: "1px solid #ccc", fontSize: 14, borderRadius: "50%", p: "2px" }}>+</IconButton>
              </Box>

              {!added ? (
                <button onClick={() => handleAddToCartSubmit(id)} style={{
                  marginTop: 6, padding: "6px", fontSize: 13, backgroundColor: "#1976d2",
                  color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 500
                }}>Add to Cart</button>
              ) : (
                <Typography fontSize={12} color="green" fontWeight={500}>✅ Added!</Typography>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductCard;
