// CartSummary.js
// import React from 'react';
import { useSelector } from "react-redux";
import { Typography, Box, Button } from "@mui/material";

const CartSummary = () => {
  const totalAmount = useSelector((state) => state.cartState.totalAmount);

  const handleCheckout = () => {
    alert("Proceeding to checkout!");
  };

  return (
    <Box
      sx={{
        my: 4,
        textAlign: "right",
        borderTop: 1,
        borderColor: "divider",
        pt: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Total: ${totalAmount.toFixed(2)}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCheckout}>
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default CartSummary;
