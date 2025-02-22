"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import CheckoutFormComponent from "@/components/Cart/CheckoutForm";
import EachCartProductComponent from "@/components/Cart/ProductItem";
import { toastMessage } from "@/utils/toast";
import { BorderedContainer, CartDetailsWrapper } from "./style";
import OrderSummary from "./OrderSummary";
import ProductItem from "@/components/Cart/ProductItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState<any>([]);
  const [totalAmount, setTotalAmount] = useState<any>(0);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    const cart: any = JSON.parse(
      localStorage.getItem("agentware-cart") || "{}"
    );
    setCartItems(Object.values(cart));
    const amount = Object.values(cart).reduce((acc: any, curr: any) => {
      return acc + (curr?.quantity || 1) * (curr?.price || 0);
    }, 0);
    setTotalAmount(amount);
  };

  const handleClearCart = (fromCheckout: boolean) => {
    localStorage.setItem("agentware-cart", "{}");
    setCartItems([]);
    setTotalAmount(0);
    if (!fromCheckout) {
      toastMessage("success", "Cart Cleared");
    }
  };

  const handleCheckout = () => {
    handleOpen();
  };

  const handleQuantityChange = (
    id: number,
    action: "increase" | "decrease"
  ) => {
    const cart: any = JSON.parse(
      localStorage.getItem("agentware-cart") || "{}"
    );
    if (action === "decrease" && cart[id].quantity > 1) {
      cart[id].quantity -= 1;
    } else if (action === "increase") {
      cart[id].quantity += 1;
    }
    localStorage.setItem("agentware-cart", JSON.stringify(cart));
    fetchCart();
  };

  const handleDelete = (id: number) => {
    const cart: any = JSON.parse(
      localStorage.getItem("agentware-cart") || "{}"
    );
    delete cart[id];
    localStorage.setItem("agentware-cart", JSON.stringify(cart));
    fetchCart();
  };

  return (
    <>
      {cartItems?.length ? (
        <Box sx={CartDetailsWrapper}>
          <Box
            sx={{
              ...BorderedContainer,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              flex: 1.5,
            }}
          >
            {cartItems.map((item: any) => (
              <ProductItem
                key={item?.id}
                handleDelete={handleDelete}
                handleQuantityChange={handleQuantityChange}
                product={item}
              />
            ))}
          </Box>
          <OrderSummary
            totalAmount={totalAmount}
            handleCheckout={handleCheckout}
            handleClearCart={handleClearCart}
          />
        </Box>
      ) : (
        <Typography variant="body1" color="textDisabled">
          No Items in Cart
        </Typography>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <CheckoutFormComponent
            handleClearCart={handleClearCart}
            handleClose={handleClose}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Cart;
