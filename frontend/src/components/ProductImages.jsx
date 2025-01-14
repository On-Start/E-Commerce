// ProductImages.jsx
import { useState } from "react";
import { ImageList, ImageListItem, Box } from "@mui/material";

const ProductImages = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <img
          src={mainImage}
          alt="Main product"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            maxHeight: 500,
          }}
          onError={(e) => (e.target.src = "/fallback-image.jpg")}
        />
      </Box>

      <ImageList
        cols={4}
        rowHeight={100}
        gap={10}
        sx={{ display: "flex", justifyContent: "flex-start" }}
      >
        {Array.isArray(images) &&
          images.map((image, index) => (
            <ImageListItem
              key={index}
              sx={{ cursor: "pointer", display: "flex" }}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onClick={() => handleImageClick(image)}
                onError={(e) => (e.target.src = "/fallback-image.jpg")}
              />
            </ImageListItem>
          ))}
      </ImageList>
    </>
  );
};

export default ProductImages;
