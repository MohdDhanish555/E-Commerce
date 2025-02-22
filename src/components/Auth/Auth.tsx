"use client";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { createSession } from "@/actions/auth-action";
import { firebaseAuth } from "@/lib/firebase/firebase";
import { toastMessage } from "@/utils/toast";

import { AuthContainer, AuthBox } from "./style";
import { LinkStyle } from "../Common/common.style";

const AuthPage = ({ type }: { type: "login" | "signup" }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (type === "signup") {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm Password is required";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);

    if (!Object.values(newErrors).some((err) => err)) {
      try {
        setLoading(true);

        if (type === "login") {
          const res = await signInWithEmailAndPassword(
            firebaseAuth,
            formData.email,
            formData.password
          );
          if (res.user) {
            const token = await res.user?.getIdToken();
            const isAuthenticated = await createSession(token);
            if (isAuthenticated) {
              router.push("/");
              toastMessage("success", "Logged in successfully");
            }
          }
        } else {
          await createUserWithEmailAndPassword(
            firebaseAuth,
            formData.email,
            formData.password
          );
          setFormData({ email: "", password: "", confirmPassword: "" });
          toastMessage("success", "Account created successfully");
        }
      } catch (err) {
        toastMessage("error", err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container maxWidth="xs" sx={AuthContainer}>
      <Box sx={AuthBox}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          {type === "login" ? "Welcome Back!" : "Create an Account"}
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            fullWidth
            type="email"
            label="Email Address"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
          />
          {type === "signup" && (
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          )}
          <Box sx={{ mt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              endIcon={loading && <CircularProgress size={16} />}
            >
              {type === "login" ? "Login" : "Sign Up"}
            </Button>
          </Box>
        </form>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {type === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <Link
            href={type === "login" ? "/sign-up" : "/login"}
            style={LinkStyle}
          >
            {type === "login" ? "Sign Up" : "Login"}
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default AuthPage;
