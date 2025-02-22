"use client";
import { PersonOutline } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

import { removeSession } from "@/actions/auth-action";
import { firebaseAuth } from "@/lib/firebase/firebase";
import { NAVLINKS } from "@/utils/constant";
import { toastMessage } from "@/utils/toast";

import { NavbarContainer, NavlinksContainer } from "./style";
import { LinkStyle } from "../Common/common.style";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuLoader, setMenuLoader] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = async () => {
    try {
      setMenuLoader(true);
      await signOut(firebaseAuth);
      const res = await removeSession();
      handleMenuClose();
      toastMessage("success", "Logged out successfully");
      if (res) {
        router.push("/");
      }
    } catch (err) {
      toastMessage("error", err as string);
    } finally {
      setMenuLoader(false);
    }
  };

  return (
    <Box sx={NavbarContainer}>
      <Box>
        <Link href={"/"} style={LinkStyle}>
          <Typography fontSize={45} fontWeight="800">
            SHOP.CO
          </Typography>
        </Link>
      </Box>

      <Box sx={NavlinksContainer}>
        {NAVLINKS.map((link) => {
          const Icon = pathname === link.path ? link.activeIcon : link.icon;

          return (
            <Link key={link.path} href={link.path} style={LinkStyle}>
              <IconButton
                sx={{
                  color: pathname === link.path ? "primary.main" : "inherit",
                  backgroundColor:
                    pathname === link.path
                      ? "rgba(0, 0, 0, 0.1)"
                      : "transparent",
                  transition: "background 0.3s ease-in-out",
                }}
              >
                {<Icon fontSize="medium" />}
              </IconButton>
            </Link>
          );
        })}
        <IconButton sx={{ color: "inherit" }} onClick={handleMenuClick}>
          <PersonOutline fontSize="medium" />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        TransitionProps={{
          exit: false,
        }}
      >
        <MenuItem
          disabled={menuLoader}
          onClick={() => {
            logoutUser();
          }}
        >
          <ListItemText>Logout</ListItemText>
          {menuLoader && (
            <ListItemIcon>
              <CircularProgress size={18} sx={{ ml: 1 }} />
            </ListItemIcon>
          )}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Navbar;
