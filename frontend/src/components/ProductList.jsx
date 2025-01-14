import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Skeleton,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.productsState);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <Grid container spacing={4} sx={{ padding: 2 }}>
        {[...Array(8)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <Skeleton variant="rectangular" height={140} />
              <CardContent>
                <Skeleton width="80%" height={24} />
                <Skeleton width="60%" />
                <Skeleton width="40%" height={32} />
              </CardContent>
              <CardActions>
                <Skeleton variant="rectangular" width="100%" height={36} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (status === "failed") {
    return (
      <Typography>Error loading products. Please try again later.</Typography>
    );
  }

  return (
    <Grid container spacing={4} sx={{ padding: 2 }}>
      {products.map((product) => (
        <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
          <Link
            to={`/product/${product._id}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <CardMedia
                component="img"
                height="140"
                image={
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : "/path/to/default-image.jpg"
                }
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {product.description}
                </Typography>
                <Typography variant="h5" color="primary">
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" fullWidth>
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
