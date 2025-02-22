import { SxProps } from "@mui/material";

export const ImageCard: SxProps = {
  position: "relative",
  alignSelf: "flex-start",
  borderRadius: "20px",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  display: "flex",
  justifyContent: "center",
  maxWidth: "100%",
  p: 1.5,
  mb: 2,
  img: {
    objectFit: "contain",
    objectPosition: "center",
    transition: "transform 0.3s ease-in-out",
  },
};

export const DetailsContainer: SxProps = {
  flex: 1,
  maxWidth: {
    xs: "100%",
    lg: "60%",
  },
};

export const ButtonContainer: SxProps = {
  display: "flex",
  gap: 2,
  alignItems: "center",
  mb: 2,
  mt: 4,
};
