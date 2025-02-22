import { SxProps } from "@mui/material";

export const NavbarContainer: SxProps = {
  height: {
    xs: "65px",
    md: "90px",
  },
  width: "100%",
  backgroundColor: "background.default",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  py: 1,
  px: 4,
};

export const NavlinksContainer: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: 2,
};
