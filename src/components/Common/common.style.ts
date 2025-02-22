import { SxProps } from "@mui/material";

export const LinkStyle = {
  textDecoration: "none",
  color: "inherit",
};

export const TruncatedText: SxProps = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordSpacing: "0.2rem",
  mb: 1.5,
};

export const ProductsWrapper: SxProps = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill , minmax(250px , 1fr))",
  columnGap: "50px",
  rowGap: "40px",
};
