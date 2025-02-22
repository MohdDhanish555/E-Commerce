"use client";
import { Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { NavbarContainer, NavlinksContainer } from "./style";
import { LinkStyle } from "../Common/common.style";

import { NAVLINKS } from "@/utils/constant";

const Navbar = () => {
  const pathname = usePathname();

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
      </Box>
    </Box>
  );
};

export default Navbar;
