// import React from "react";
import { Typography, Box, Chip, Divider, Stack, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductDetails = ({ details }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cartState.items || []);
  console.log(cartItems)

  const isInCart = cartItems.some((item) => item.id === details._id);

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addItemToCart({ 
        id: details._id, 
        name: details.name, 
        price: details.price, 
        image: details.images[0],
        quantity: 1 
      }));
      console.log('Product added to cart:', details);
    }
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          {details.name}
        </Typography>
        <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
          ${details.price.toFixed(2)}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" color="text.secondary" paragraph>
          {details.description}
        </Typography>
        <Stack direction="row" spacing={1} marginBottom={2}>
          <Chip label={`Category: ${details.category}`} color="secondary" />
          <Chip label={`Brand: ${details.brand}`} />
        </Stack>
        {isInCart ? (
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={handleGoToCart}
          >
            Go to Cart
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        )}
      </Box>
    </>
  );
};

export default ProductDetails;
