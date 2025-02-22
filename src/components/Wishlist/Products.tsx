"use client";

import { Box, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

import { ProductsWrapper } from "../Common/common.style";

import {
  ProductsCard,
  ProductsCardSkeleton,
} from "@/components/Common/Products";
import http from "@/utils/http";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [favProducts, setFavProducts] = useState<any>([]);

  const handleWishlist = (id: number) => {
    const filteredProducts = favProducts.filter((item) => item?.id != id);

    setFavProducts(filteredProducts);
    localStorage.setItem(
      "agetware-wishlist",
      JSON.stringify(filteredProducts.map((item) => item?.id))
    );
  };

  console.log({ favProducts });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res: AxiosResponse = await http.get("/products");

        const favArray = [];

        Object.values(res.data?.products).forEach((product: any) => {
          if (
            JSON.parse(
              localStorage?.getItem("agetware-wishlist") || "[]"
            ).includes(product?.id)
          ) {
            favArray.push(product);
          }
        });

        const formattedData = favArray.map((product: any) => ({
          id: product?.id,
          title: product?.title,
          imageUrl: product?.image,
          price: product?.price,
          brand: product?.brand,
          model: product?.model,
          discount: product?.discount,
          isPopular: product?.popular,
        }));

        setFavProducts(formattedData);
        setLoading(false);
      } catch (err) {
        console.log(err as Error);
        setLoading(false);
      }
    };
    fetchData();
  }, [setLoading]);

  return (
    <Box sx={ProductsWrapper}>
      {loading ? (
        <>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <ProductsCardSkeleton key={index} />
            ))}
        </>
      ) : (
        <>
          {favProducts?.length ? (
            favProducts.map((item) => (
              <ProductsCard
                key={item?.id}
                product={item}
                handleWishlist={handleWishlist}
                isWishlisted={true}
              />
            ))
          ) : (
            <Typography variant="body1" color="textDisabled">
              No Items in Wishlist
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default Products;
