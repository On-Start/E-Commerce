import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../redux/productSlice';
import Navbar from '../components/Navbar';
import ProductImages from '../components/ProductImages';
import ProductDetails from '../components/ProductDetails';
import AddToCartButton from '../components/AddToCartButton';
import ProductReviews from '../components/ProductReviews';
import { CircularProgress, Typography } from '@mui/material';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, status, error } = useSelector((state) => state.productsState);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return <Typography>Error loading product. Please try again later.</Typography>;
  }

  return selectedProduct ? (
    <div>
      <Navbar />
      <ProductImages images={selectedProduct.imagesUrl} />
      {console.log(selectedProduct)}
      <ProductDetails details={selectedProduct} />
      <AddToCartButton productId={selectedProduct.id} />
      <ProductReviews reviews={selectedProduct.reviews} />
    </div>
  ) : (
    <Typography>No product found.</Typography>
  );
};

export default ProductDetailPage;
