import { SxProps } from "@mui/material";

export const BannerContainer: SxProps = {
  bgcolor: "secondary.main",
  p: "40px 32px",
};

export const ContentWrapper: SxProps = {
  maxWidth: {
    xs: "100%",
    lg: "40%",
  },
  display: "flex",
  flexDirection: "column",
  gap: "25px",
};
