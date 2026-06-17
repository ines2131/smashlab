"use client";
import axios from "axios";
import { useEffect } from "react";
import { useCurrentUser } from "./useCurrentUser";

export function useSyncCart() {
  const { data: user, isLoading } = useCurrentUser();

  useEffect(() => {
    if (isLoading) return;
    if (!user) return;

    const syncCart = async () => {
      const guestCart = JSON.parse(localStorage.getItem("guest-cart") || "[]");

      if (!guestCart.length) return;

      await axios.post("/api/cart/sync", {
        items: guestCart,
      });

      localStorage.removeItem("guest-cart");
    };

    syncCart();
  }, [user, isLoading]);
}
