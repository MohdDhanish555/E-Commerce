import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        height: "300px",
        bgcolor: "secondary.main",
        mt: "100px",
        position: "relative",
      }}
    >
      {/* <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "primary.main",
          minHeight: "125px",
          width: "80%",
          borderRadius: "20px",
          p: 2,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          fontSize={40}
          color="background.default"
          lineHeight={"100%"}
          sx={{
            "&:hover": {
              textShadow: "0px 2px 10px rgba(255, 255, 255, 0.5)",
            },
          }}
        >
          SHOP.CO
        </Typography>
      </Box> */}
    </Box>
  );
};

export default Footer;
