import http from "@/utils/http";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

const CategoryMenu = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [allCategories, setAllCategories] = useState<Array<string>>([]);
  const [selectedOption, setSelectedOption] = useState<string>("title");
  const [isAscending, setIsAscending] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res: AxiosResponse = await http.get("/products/category");
        const formattedData = res.data?.categories?.map(
          (category: any) => category
        );
        setAllCategories(["all", ...formattedData]);

        setLoading(false);
      } catch (err) {
        console.log(err as Error);
        setLoading(false);
      }
    };
    fetchData();
  }, [setLoading]);

  const handleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  return (
    <>
      <Box sx={{ mb: 2.5, display: "flex", gap: 3, flexWrap: "wrap" }}>
        {loading ? (
          <ButtonGroup variant="outlined">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} variant="rectangular" height={50} />
              ))}
          </ButtonGroup>
        ) : (
          <>
            {allCategories.map((category) => (
              <Box
                key={category}
                onClick={() => setSelectedCategory(category)}
                sx={{
                  textTransform: "capitalize",
                }}
              >
                <Typography variant="subtitle1">{category}</Typography>
              </Box>
            ))}
          </>
        )}
      </Box>
      {/* <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedOption}
            label="Filter By"
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
          >
            <MenuItem value={"title"}>Title</MenuItem>
            <MenuItem value={"price"}>Price</MenuItem>
            <MenuItem value={"rating"}>Rating</MenuItem>
          </Select>
        </FormControl>
        <button onClick={handleSortOrder}>
          Sort {isAscending ? "↓" : "↑"}
        </button>
      </div> */}
    </>
  );
};

export default CategoryMenu;
