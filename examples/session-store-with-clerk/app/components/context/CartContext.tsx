"use client";

import React, { createContext, useEffect, useState, useContext } from "react";

import { items } from "@/public/items";

import { Redis } from "@upstash/redis";
import UserStateContext from "./UserStateContext";

const redis = Redis.fromEnv()

type Item = {
  id: number;
  title: string;
  image: string;
  description: string;
  company: string;
  price: number;
  rateValue: number;
  rateCount: number;
};

interface CartContextProps {
  cart: Item[];
  cartItems: cartContent;
  addItem: (id: number) => Promise<void>;
  checkout: () => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  resetCart: () => {};
}

type cartContent = {
  [key: string]: number;
};

const CartContext = createContext<CartContextProps>({
  cart: [],
  cartItems: {},
  addItem: async (id: number) => {},
  checkout: async () => {},
  removeItem: async (id: number) => {},
  resetCart: async () => {},
});

const mapIdsToObjects = (
  products: Item[],
  ids: string[],
  cartItems: cartContent
): Item[] => {
  const mappedItems: Item[] = [];
  for (const id of ids) {
    const product = products.find((p) => p.id === parseInt(id));
    if (product && cartItems?.hasOwnProperty(id)) {
      mappedItems.push(product);
    }
  }

  return mappedItems;
};

export const CartProvider: any = ({
  children,
  userId,
}: {
  children: any;
  userId: string;
}) => {
  let itemCount = 0;
  const [cart, setCart] = useState<Item[]>([]);
  const [cartItems, setCartItems] = useState<cartContent>({});

  const { userState, triggerEvent } = useContext(UserStateContext);

  useEffect(() => {
    fetchCartItems();
  }, [itemCount]);

  const fetchCartItems = async () => {
    const itemIDs = await redis.smembers(`usercart:${userId}`);
    const flatitems = await redis.hgetall(`user:${userId}`);

    setCartItems(flatitems as cartContent);
    setCart(mapIdsToObjects(items, itemIDs, flatitems as cartContent));
  };

  const addItem = async (id: number) => {
    const item = items.find((i) => i.id === id);

    if (!item) return;

    const doesItemExist = cart.some((i) => {
      return id === i.id;
    });

    let newCart: Item[];

    if (!doesItemExist) {
      item.quantity = 1;
      newCart = [...(cart || []), item];
      redis.hincrby(`user:${userId}`, id.toString(), 1);
      redis.sadd(`usercart:${userId}`, id.toString());

      const newCartItems = { ...cartItems, [id]: 1 };

      setCartItems(newCartItems);
      setCart(newCart);
      triggerEvent("add-to-cart");
    } else {
      const item = items.find((i) => i.id === id);

      const updatedItemQuantities = {
        ...cartItems,
        [id]: cartItems[id] + 1,
      };

      setCartItems(updatedItemQuantities);
      redis.hincrby(`user:${userId}`, id.toString(), 1);
    }
  };

  const removeItem = async (id: number, force: boolean = false) => {
    const doesItemExist = cart.some((i) => {
      return id === i.id;
    });

    if (!doesItemExist) return;

    if (cartItems[id] === 1 || force) {
      const newCart: Item[] = cart.filter((item: { id: number }) => {
        return item.id !== id;
      });

      const newCartItems = { ...cartItems };
      delete newCartItems[id];
      redis.hdel(`user:${userId}`, id.toString());

      setCart(newCart);
      setCartItems(newCartItems);
      console.log(Object.keys(newCartItems).length);
      if (Object.keys(newCartItems).length === 0) {
        triggerEvent("cart-emptied");
      } else {
        triggerEvent("remove-from-cart");
      }
    } else if (cartItems[id] > 1) {
      const updatedItemQuantities = {
        ...cartItems,
        [id]: cartItems[id] - 1,
      };

      setCartItems(updatedItemQuantities);

      redis.hincrby(`user:${userId}`, id.toString(), -1);
    }
  };

  const resetCart = async () => {
    redis.del(`user:${userId}`);

    setCart([]);
    setCartItems({});
  };

  const checkout = async () => {
    if (Object.keys(cartItems).length > 0) {
      triggerEvent("checkout", undefined, cart);
    }
    resetCart();
  };

  return (
    <CartContext.Provider
      value={{
        addItem,
        removeItem,
        cartItems,
        checkout,
        resetCart,
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
