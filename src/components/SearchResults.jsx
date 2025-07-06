import React from "react";
import { Box, Typography, Button } from "@mui/material";

const SearchResults = ({ searchQuery, filteredResults, themeColor, setShowResults, setSearchQuery, navigate }) => {
  return (
    <Box p={2} sx={{ bgcolor: themeColor === "dark" ? "#1a1a1a" : "#ffffff" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography
          variant="h6"
          sx={{
            color: themeColor === "dark" ? "#ffffff" : "#000000",
            fontWeight: 600
          }}
        >
          Search Results for "{searchQuery}"
        </Typography>
        <Button
          size="small"
          onClick={() => {
            setShowResults(false);
            setSearchQuery("");
          }}
          sx={{
            borderRadius: 2,
            color: "primary.main",
            "&:hover": {
              bgcolor: "rgba(25, 118, 210, 0.1)",
            }
          }}
        >
          Clear
        </Button>
      </Box>

      {filteredResults.length === 0 ? (
        <Typography sx={{ color: themeColor === "dark" ? "#ffffff" : "#000000" }}>
          No products found.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(auto-fill, minmax(160px, 1fr))",
              sm: "repeat(auto-fill, minmax(200px, 1fr))",
              md: "repeat(auto-fill, minmax(250px, 1fr))"
            },
            gap: 2,
            mt: 2,
          }}
        >
          {filteredResults.map((product) => (
            <Box
              key={product.id}
              sx={{
                border: `1px solid ${themeColor === "dark" ? "#404040" : "#e0e0e0"}`,
                borderRadius: 3,
                p: 2,
                textAlign: "center",
                backgroundColor: themeColor === "dark" ? "#2a2a2a" : "#ffffff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  borderColor: "primary.main"
                },
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{
                  height: 120,
                  objectFit: "contain",
                  borderRadius: "8px"
                }}
              />
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                mt={1}
                sx={{
                  color: themeColor === "dark" ? "#ffffff" : "#000000",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }}
              >
                {product.title}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: themeColor === "dark" ? "#aaa" : "#666",
                  textTransform: "capitalize"
                }}
              >
                {product.category}
              </Typography>
              <Typography
                color="primary"
                fontWeight="bold"
                sx={{ fontSize: "1.1rem" }}
              >
                ${product.price}
              </Typography>

              <Button
                variant="outlined"
                color="primary"
                size="small"
                fullWidth
                sx={{ mt: 1, borderRadius: 2 }}
                onClick={() => {
                  setShowResults(false);
                  setSearchQuery("");
                  navigate(`/product/${product.id}`);
                }}
              >
                View Details
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchResults;
