import { Box, Skeleton, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import React, { useEffect, useState, useRef } from "react";

import http from "@/utils/http";

type Props = {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const CategoryMenu = ({ setSelectedCategory }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allCategories, setAllCategories] = useState<Array<string>>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const categoryRefs = useRef<unknown>({});

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

  useEffect(() => {
    if (categoryRefs.current[activeCategory]) {
      const { offsetLeft, offsetWidth } = categoryRefs.current[activeCategory]!;
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeCategory, allCategories]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setSelectedCategory(category);
  };

  return (
    <Box sx={{ position: "relative", display: "flex", gap: 3, mb: 2.5 }}>
      {loading
        ? Array(5)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} variant="text" width={60} height={30} />
            ))
        : allCategories.map((category) => (
            <Box
              key={category}
              ref={(el) => {
                if (el) categoryRefs.current[category] = el;
              }}
              onClick={() => handleCategoryClick(category)}
              sx={{
                position: "relative",
                cursor: "pointer",
                fontWeight: activeCategory === category ? "bold" : "normal",
                color: activeCategory === category ? "primary.main" : "inherit",
                transition: "color 0.3s ease",
              }}
            >
              <Typography variant="subtitle1" textTransform={"capitalize"}>
                {category}
              </Typography>
            </Box>
          ))}
      <Box
        sx={{
          position: "absolute",
          bottom: -2,
          height: "3px",
          backgroundColor: "primary.main",
          borderRadius: "2px",
          transition: "all 0.3s ease",
          left: `${underlineStyle.left}px`,
          width: `${underlineStyle.width}px`,
        }}
      />
    </Box>
  );
};

export default CategoryMenu;
