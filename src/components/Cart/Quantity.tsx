import React from "react";

import { QuantityComponentProps } from "@/app/types";
import { Box, Button, IconButton, Typography } from "@mui/material";
import {
  Add,
  AddCircleOutline,
  Remove,
  RemoveCircleOutline,
} from "@mui/icons-material";

const QuantityComponent = ({
  quantity,
  handleIncrease,
  handleDecrease,
}: QuantityComponentProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "secondary.main",
        width: "fit-content",
        gap: {
          xs: "6px",
          md: "12px",
        },
        padding: {
          xs: "6px 8px",
          md: "6px 10px",
        },
        borderRadius: "20px",
      }}
    >
      <IconButton sx={{ p: 0 }} onClick={handleDecrease}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography variant="subtitle1">{quantity}</Typography>
      <IconButton sx={{ p: 0 }} onClick={handleIncrease}>
        <AddCircleOutline />
      </IconButton>
      {/* <Box
        // disabled={quantity === 1}
        onClick={handleDecrease}
      >
        -
      </Box>
      <p style={{ margin: 0 }}>{quantity}</p>
      <Box onClick={handleIncrease}>+</Box> */}
    </Box>
  );
};

export default QuantityComponent;
