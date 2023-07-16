import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartSelector } from "recoil/cart";
import { MAX_QUANTITY, MIN_QUANTITY } from "constants/cartProduct";
import { CartProduct } from "types/domain";
import { changeItemQuantity, removeCartItem } from "api/cartItems";
import { serverSelectState } from "recoil/server";

export const useQuantity = (productId: number) => {
  const selectedServer = useRecoilValue(serverSelectState);
  const [cartItem, setCartItem] = useRecoilState(cartSelector(productId));
  const [quantity, setQuantity] = useState<string>(
    cartItem ? cartItem.quantity.toString() : MIN_QUANTITY.toString()
  );

  const changeQuantity = async (newQuantity: string) => {
    if (Number(newQuantity) > MAX_QUANTITY || Number(newQuantity) < MIN_QUANTITY) return;

    if (!cartItem) {
      alert(`서버와의 통신이 원활하지 않습니다. 잠시후 다시 시도해주세요.`);
      return;
    }

    const result =
      Number(newQuantity) > MIN_QUANTITY
        ? await changeItemQuantity(selectedServer, cartItem.id, Number(newQuantity))
        : await removeCartItem(selectedServer, cartItem.id);

    if (!result) {
      alert(`서버와의 통신이 원활하지 않습니다. 잠시후 다시 시도해주세요.`);
      return;
    }

    setQuantity(newQuantity);
    setCartItem({ ...cartItem, quantity: Number(newQuantity) } as CartProduct);
  };

  const handleQuantityChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleQuantityBlurred = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (quantity === "" || Number(quantity) < MIN_QUANTITY)
      e.target.value = MIN_QUANTITY.toString();
    if (Number(quantity) > MAX_QUANTITY) e.target.value = MAX_QUANTITY.toString();

    changeQuantity(e.target.value);
  };

  return {
    quantity,
    changeQuantity,
    handleQuantityChanged,
    handleQuantityBlurred,
  } as const;
};
