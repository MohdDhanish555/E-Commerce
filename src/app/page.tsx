import { Box } from "@mui/material";
import React from "react";

import Banner from "@/components/Home/Banner";
import Products from "@/components/Home/Products/Products";

export default function Home() {
  return (
    <Box component="main">
      <Banner />
      <Box sx={{ bgcolor: "primary.main", height: "120px" }} />
      <Products />
    </Box>
  );
}
