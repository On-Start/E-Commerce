import React from 'react';
import { ImageList, ImageListItem } from '@mui/material';

const ProductImages = ({ images }) => (
  <ImageList cols={2} rowHeight={160}>
    {images.map((image, index) => (
      <ImageListItem key={index}>
        <img src={image} alt={`Product ${index}`} loading="lazy" />
      </ImageListItem>
    ))}
  </ImageList>
);

export default ProductImages;
