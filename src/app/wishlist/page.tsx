import { Box } from "@mui/material";

import BreadcrumbsBar from "@/components/Common/BreadcrumbsBar";
import Products from "@/components/Wishlist/Products";

const Wishlist = () => {
  return (
    <Box
      component="main"
      sx={{
        px: {
          xs: "16px",
          md: "32px",
        },
      }}
    >
      <BreadcrumbsBar
        routes={[
          {
            label: "Home",
            path: "/",
          },
          {
            label: "My Wishlist",
            path: "#",
            isActive: true,
          },
        ]}
      />
      <Products />
    </Box>
  );
};

export default Wishlist;
