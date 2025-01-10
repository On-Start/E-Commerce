import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const ProductReviews = ({ reviews }) => (
  <div>
    <Typography variant="h5">Reviews</Typography>
    <List>
      {reviews.map((review, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={`Rating: ${review.rating}`}
            secondary={review.comment}
          />
        </ListItem>
      ))}
    </List>
  </div>
);

export default ProductReviews;
