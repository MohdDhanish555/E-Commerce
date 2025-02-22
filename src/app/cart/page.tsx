import { Box } from "@mui/material";

import Cart from "@/components/Cart/Cart";
import BreadcrumbsBar from "@/components/Common/BreadcrumbsBar";

const CartPage = () => {
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
            label: "My Cart",
            path: "#",
            isActive: true,
          },
        ]}
      />
      <Cart />
    </Box>
  );
};

export default CartPage;
