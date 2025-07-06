import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <Box px={3} py={4} display="flex" justifyContent="center">
      <Paper elevation={3} sx={{ p: 4, textAlign: "center", maxWidth: 500 }}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 60 }} />
        <Typography variant="h5" fontWeight={600} mt={2}>
          Payment Failed!
        </Typography>
        <Typography color="text.secondary" mt={1}>
          Something went wrong. Please try again.
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 3 }}
          onClick={() => navigate("/cart")}
        >
          Back to Cart
        </Button>
      </Paper>
    </Box>
  );
};

export default PaymentFailed;
