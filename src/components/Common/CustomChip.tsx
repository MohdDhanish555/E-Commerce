import { Chip } from "@mui/material";

export const FireGlowChip = ({ label }: { label: string }) => {
  return (
    <Chip
      label={label}
      variant="filled"
      sx={{
        fontSize: "1rem",
        fontWeight: "600",
        color: "#fff",
        backgroundImage: "linear-gradient(135deg, #FF4500, #FF8C00, #FFD700)",
        boxShadow: "0px 0px 10px rgba(255, 140, 0, 0.6)",
        "&:hover": {
          boxShadow: "0px 0px 15px rgba(255, 140, 0, 1)",
        },
      }}
    />
  );
};
