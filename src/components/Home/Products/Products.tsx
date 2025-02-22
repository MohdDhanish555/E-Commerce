"use client";
import { Box } from "@mui/material";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

import { ProductsWrapper } from "@/components/Common/common.style";
import http from "@/utils/http";
import { toastMessage } from "@/utils/toast";

import CategoryMenu from "./CategoryMenu";
import Header from "./Header";
import { ProductsCard, ProductsCardSkeleton } from "../../Common/Products";

const Products = () => {
  const [productsList, setProductsList] = useState<any>([]);
  const [modifiedProductsList, setModifiedProductsList] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [wishlist, setWishlist] = useState<Array<number>>([]);

  const [loading, setLoading] = useState(true);

  const [searchWord, setSearchWord] = useState<string>("");
  const [debouncedSearchWord, setDebouncedSearchWord] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        let url = "/products";

        if (selectedCategory !== "all") {
          url += `/category?type=${selectedCategory}`;
        }

        const res: AxiosResponse = await http.get(url);
        const formattedData = res.data?.products.map((product: any) => ({
          id: product?.id,
          title: product?.title,
          imageUrl: product?.image,
          price: product?.price,
          brand: product?.brand,
          model: product?.model,
          discount: product?.discount,
          isPopular: product?.popular,
          color: product?.color,
        }));
        setProductsList(formattedData);
        setModifiedProductsList(formattedData);

        setLoading(false);
      } catch (err) {
        toastMessage("error", err as string);
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchWord(searchWord);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchWord]);

  useEffect(() => {
    if (debouncedSearchWord) {
      setModifiedProductsList((prevProducts) =>
        prevProducts.filter((product) =>
          product.title
            .toLowerCase()
            .includes(debouncedSearchWord.toLowerCase())
        )
      );
    } else {
      setModifiedProductsList(productsList);
    }
  }, [debouncedSearchWord, productsList]);

  useEffect(() => {
    getWishlist();
  }, []);

  const getWishlist = () => {
    setWishlist(JSON.parse(localStorage?.getItem("agetware-wishlist") || "[]"));
  };

  const addToWishlist = (id: number) => {
    localStorage.setItem(
      "agetware-wishlist",
      JSON.stringify([...wishlist, id])
    );
    getWishlist();
  };

  const removeFromWishlist = (id: number) => {
    localStorage.setItem(
      "agetware-wishlist",
      JSON.stringify(wishlist.filter((idx: number) => idx != id))
    );
    getWishlist();
  };

  const handleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  return (
    <Box id="products" sx={{ px: 4, py: 2 }}>
      <Header
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        setModifiedProductsList={setModifiedProductsList}
      />
      <CategoryMenu setSelectedCategory={setSelectedCategory} />
      <Box sx={ProductsWrapper}>
        {loading ? (
          <>
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <ProductsCardSkeleton key={index} />
              ))}
          </>
        ) : (
          <>
            {modifiedProductsList?.map((product: any) => (
              <ProductsCard
                key={product?.id}
                product={product}
                handleWishlist={handleWishlist}
                isWishlisted={wishlist.includes(product?.id)}
              />
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Products;
