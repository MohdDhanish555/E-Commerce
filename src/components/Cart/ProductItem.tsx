import React from "react";

import QuantityComponent from "./Quantity";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { Delete } from "@mui/icons-material";
import { TruncatedText } from "../Common/common.style";
import ImageWithFallback from "../Common/ImageWithFallback";
import { ImageCard } from "./style";

const ProductItem = ({ product, handleQuantityChange, handleDelete }: any) => {
  return (
    <Box
      key={product?.id}
      sx={{
        display: "flex",
        gap: "16px",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box sx={ImageCard}>
        <ImageWithFallback
          imageUrl={product?.image}
          alt={product?.category || "Product"}
          width={120}
          height={120}
        />
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Typography variant="h4" sx={TruncatedText}>
            {product?.title}
          </Typography>
          <IconButton onClick={() => handleDelete(product.id)} sx={{ p: 0 }}>
            <Delete color="error" />
          </IconButton>
        </Box>

        <Typography variant="subtitle1" component={"span"} sx={{ mb: 1 }}>
          Color :{" "}
          <Typography
            variant="subtitle1"
            color="textSecondary"
            component={"span"}
            sx={{ textTransform: "capitalize" }}
          >
            {product?.color}
          </Typography>
        </Typography>
        <Box
          sx={{
            mt: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h2">${product?.price}</Typography>
          <QuantityComponent
            quantity={product?.quantity}
            handleDecrease={() => handleQuantityChange(product.id, "decrease")}
            handleIncrease={() => handleQuantityChange(product.id, "increase")}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductItem;
