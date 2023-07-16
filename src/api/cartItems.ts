import { ServerId } from "recoil/server";
import { Product } from "./products";
import { SERVER_LIST } from "./constants";

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export const getCartItems = async (serverId: ServerId): Promise<CartItem[]> => {
  const response = await fetch(`${SERVER_LIST[serverId]}/cart-items`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${process.env.REACT_APP_USER_TOKEN}`,
    },
  });

  const data = await response.json();

  if (!response.ok)
    throw new Error(data.message ?? "오류가 발생했습니다. 잠시 후 다시 시도해주세요.");

  return data;
};

export const addCartItem = async (serverId: ServerId, productId: number) => {
  const response = await fetch(`${SERVER_LIST[serverId]}/cart-items`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${process.env.REACT_APP_USER_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: productId }),
  });

  const cartItemId = response.headers.get("Location")?.split("/")[2];

  return response.ok && cartItemId;
};

export const changeItemQuantity = async (
  serverId: ServerId,
  cartItemId: number,
  quantity: number
) => {
  const response = await fetch(`${SERVER_LIST[serverId]}/cart-items/${cartItemId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Basic ${process.env.REACT_APP_USER_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: quantity }),
  });

  return response.ok;
};

export const removeCartItem = async (serverId: ServerId, cartItemId: number) => {
  const response = await fetch(`${SERVER_LIST[serverId]}/cart-items/${cartItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${process.env.REACT_APP_USER_TOKEN}`,
    },
  });

  return response.ok;
};
