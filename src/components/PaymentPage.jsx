import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Paper, Alert, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const storedTotal = localStorage.getItem("cartTotal");
    if (storedTotal) {
      setTotalAmount(parseFloat(storedTotal));
    } else {
      navigate("/cart");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const validateCard = () => {
    const { name, cardNumber, expiry, cvv } = formData;
    if (!name || !cardNumber || !expiry || !cvv) return "All fields are required.";
    if (!/^[0-9]{16}$/.test(cardNumber)) return "Card number must be 16 digits.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) return "Expiry must be in MM/YY format.";
    if (!/^[0-9]{3}$/.test(cvv)) return "CVV must be 3 digits.";
    if (cardNumber !== "4111111111111111") return "Invalid test card number.";
    return "";
  };

  const handlePayment = () => {
    const validationError = validateCard();
    if (validationError) {
      setError(validationError);
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      navigate("/payment-success");
    }, 2000);
  };

  return (
    <Box px={3} py={4}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          💳 Payment Summary
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Total Amount to Pay:{" "}
          <strong style={{ color: "#1976d2" }}>₹{totalAmount.toFixed(2)}</strong>
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          fullWidth
          label="Cardholder Name"
          variant="outlined"
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Card Number"
          variant="outlined"
          margin="normal"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
        />
        <Box display="flex" gap={2}>
          <TextField
            fullWidth
            label="Expiry Date (MM/YY)"
            variant="outlined"
            margin="normal"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="CVV"
            type="password"
            variant="outlined"
            margin="normal"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handlePayment}
          disabled={processing}
        >
          {processing ? "Processing..." : `Pay ₹${totalAmount.toFixed(2)}`}
        </Button>
      </Paper>
    </Box>
  );
};

export default PaymentPage;
