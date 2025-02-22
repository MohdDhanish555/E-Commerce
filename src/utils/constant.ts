import {
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";

import { NavlinksType } from "./type";

export const NAVLINKS: NavlinksType[] = [
  {
    path: "/wishlist",
    label: "Wishlist",
    icon: FavoriteBorder,
    activeIcon: Favorite,
  },
  {
    path: "/cart",
    label: "Cart",
    icon: ShoppingCartOutlined,
    activeIcon: ShoppingCart,
  },
];

export const FALLBACK_IMAGE = "/placeholder-3.png";

export const ROOT_ROUTE = "/";
export const HOME_ROUTE = "/";

export const SESSION_COOKIE_NAME = "user_session";
