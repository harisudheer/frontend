import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box px={3} py={4} display="flex" justifyContent="center">
      <Paper elevation={3} sx={{ p: 4, textAlign: "center", maxWidth: 500 }}>
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60 }} />
        <Typography variant="h5" fontWeight={600} mt={2}>
          Payment Successful!
        </Typography>
        <Typography color="text.secondary" mt={1}>
          Thank you for your purchase. Redirecting to homepage...
        </Typography>
        <Button sx={{ mt: 3 }} onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </Paper>
    </Box>
  );
};

export default PaymentSuccess;
