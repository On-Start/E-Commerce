// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchProductById } from '../redux/productSlice';
// import Navbar from '../components/Navbar';
// import ProductImages from '../components/ProductImages';
// import ProductDetails from '../components/ProductDetails';
// import AddToCartButton from '../components/AddToCartButton';
// // import ProductReviews from '../components/ProductReviews';
// import { CircularProgress, Typography } from '@mui/material';

// const ProductDetailPage = () => {
//   const { productId } = useParams();
//   // console.log(productId)
//   const dispatch = useDispatch();
//   const { selectedProduct, status, error } = useSelector((state) => state.productsState);

//   useEffect(() => {
//     dispatch(fetchProductById(productId));
//   }, [dispatch, productId]);

//   if (status === 'loading') {
//     return <CircularProgress />;
//   }

//   if (status === 'failed') {
//     return <Typography>Error loading product. Please try again later.</Typography>;
//   }

//   return selectedProduct ? (
//     <div>
//       <Navbar />
//       {console.log(selectedProduct)}
//       <ProductImages images={[selectedProduct.images]} />
//       <ProductDetails details={selectedProduct} />
//       <AddToCartButton productId={selectedProduct.id} />
//       {/* <ProductReviews reviews={selectedProduct.reviews} /> */}
//     </div>
//   ) : (
//     <Typography>No product found.</Typography>
//   );
// };

// export default ProductDetailPage;


import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../redux/productSlice';
import Navbar from '../components/Navbar';
import ProductImages from '../components/ProductImages';
import ProductDetails from '../components/ProductDetails';
import { CircularProgress, Typography, Box, Grid } from '@mui/material';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, status } = useSelector((state) => state.productsState);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Typography color="error" align="center">
        Error loading product. Please try again later.
      </Typography>
    );
  }

  return selectedProduct ? (
    <Box>
      <Navbar />
      <Grid container spacing={4} padding={2}>
        <Grid item xs={12} md={8}>
          <ProductImages images={selectedProduct.images} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <ProductDetails details={selectedProduct} />

          </Box>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Typography align="center">No product found.</Typography>
  );
};

export default ProductDetailPage;