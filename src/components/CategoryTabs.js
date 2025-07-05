import React from "react";
import { Box, Typography } from "@mui/material";

const CategoryTabs = ({ categories, onCategoryChange, themeColor }) => {
  return (
    <Box
      sx={{
        width: "90%",
        display: "flex",
        justifyContent: "center",
        mt: 2,
        px: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: themeColor === "dark" ? "#2a2a2a" : "#fff",
          borderRadius: "40px",
          padding: { xs: "6px 6px", sm: "8px 8px", md: "10px 10px" },
          boxShadow: 3,
          maxWidth: "750px",
          width: "100%",
          overflowX: { xs: "auto", md: "hidden" },
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          flexWrap: "nowrap",
          justifyContent: {
            xs: "flex-start",
            sm: "space-between",
          },
        }}
      >
        {categories.map((cat) => (
          <Box
            key={cat.name}
            onClick={() => onCategoryChange(cat.name)}
            sx={{
              cursor: "pointer",
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              px: { xs: 1.5, sm: 1.5 },
              py: 0.5,
              minWidth: 60,
              mx: 0.5,
              borderRadius: "30px",
              "&:hover": {
                backgroundColor: themeColor === "dark" ? "#3a3a3a" : "#f5f5f5",
              },
              transition: "background 0.3s ease",
            }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "3px",
              }}
            />
            <Typography
              variant="caption"
              fontWeight={500}
              sx={{
                textTransform: "capitalize",
                fontSize: { xs: "10px", sm: "11px", md: "13px" },
                textAlign: "center",
                color: themeColor === "dark" ? "#fff" : "#000",
              }}
            >
              {cat.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryTabs;
