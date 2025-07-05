import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BrandLogo = ({ isMobile }) => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        minWidth: { xs: '120px', sm: '140px' },
        cursor: 'pointer',
      }}
      onClick={() => navigate("/")}
    >
      <img
        src="/logo192.png"
        alt="logo"
        style={{
          height: isMobile ? 24 : 32,
          marginRight: 8,
          borderRadius: "50%",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      />
      <Typography
        variant={isMobile ? "subtitle1" : "h6"}
        fontWeight="bold"
        sx={{
          color: "primary.main",
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        MyStore
      </Typography>
    </Box>
  );
};

export default BrandLogo;