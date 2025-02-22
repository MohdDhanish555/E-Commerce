import { Box, Skeleton, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

import http from "@/utils/http";

type Props = {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const CategoryMenu = ({ setSelectedCategory }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allCategories, setAllCategories] = useState<Array<string>>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res: AxiosResponse = await http.get("/products/category");
        const formattedData = res.data?.categories ?? [];
        setAllCategories(["all", ...formattedData]);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setSelectedCategory(category);
  };

  return (
    <Box sx={{ mb: 2.5, display: "flex", gap: 3, flexWrap: "wrap" }}>
      {loading
        ? Array(5)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} variant="text" width={60} height={30} />
            ))
        : allCategories.map((category) => (
            <Box
              key={category}
              onClick={() => handleCategoryClick(category)}
              sx={{
                position: "relative",
                textTransform: "capitalize",
                cursor: "pointer",
                fontWeight: activeCategory === category ? "bold" : "normal",
                color: activeCategory === category ? "primary.main" : "inherit",
                transition: "color 0.2s ease-in-out",
                pb: "5px",
              }}
            >
              <Typography variant="subtitle1">{category}</Typography>
              {activeCategory === category && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "50%",
                    height: "2px",
                    backgroundColor: "primary.main",
                    borderRadius: "2px",
                  }}
                />
              )}
            </Box>
          ))}
    </Box>
  );
};

export default CategoryMenu;
