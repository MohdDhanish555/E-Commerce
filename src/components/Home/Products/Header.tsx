import { ArrowCircleDown, ArrowCircleUp, Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { HeaderContainer, RoundedInputStyle } from "./style";

type Props = {
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  setModifiedProductsList: React.Dispatch<React.SetStateAction<any[]>>;
};

const Header = ({
  searchWord,
  setSearchWord,
  setModifiedProductsList,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>("title");
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const handleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  useEffect(() => {
    setModifiedProductsList((prevProducts) => {
      const sortedProducts = [...prevProducts].sort((a, b) => {
        switch (selectedOption) {
          case "price":
            return isAscending ? a.price - b.price : b.price - a.price;
          case "title":
            return isAscending
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });

      return sortedProducts;
    });
  }, [selectedOption, isAscending, setModifiedProductsList]);

  return (
    <Box sx={HeaderContainer}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Typography variant="h1" fontWeight={"bold"}>
          PRODUCTS
        </Typography>

        <TextField
          placeholder="Search..."
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          sx={RoundedInputStyle}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Typography variant="subtitle1" color="textSecondary">
          Sort by
        </Typography>
        <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Select
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
            sx={{ ...RoundedInputStyle, minWidth: "150px", border: "none" }}
          >
            <MenuItem value={"title"}>Title</MenuItem>
            <MenuItem value={"price"}>Price</MenuItem>
          </Select>
          <IconButton onClick={handleSortOrder}>
            {isAscending ? <ArrowCircleDown /> : <ArrowCircleUp />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
