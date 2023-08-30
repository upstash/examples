"use client";

import { FaCartShopping } from "react-icons/fa6";
import UserStateContext from "../context/UserStateContext";
import { useContext } from "react";

type cartContent = {
  [key: string]: number;
};

const CartButton = ({
  id,
  cartItems,
  addItem,
  removeItem,
}: {
  id: number;
  cartItems: cartContent;
  addItem: (id: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
}) => {
  const itemExists: boolean = cartItems?.hasOwnProperty(id);

  const { triggerEvent } = useContext(UserStateContext);
  return (
    <button
      className={`${
        itemExists ? "bg-red-400 text-black" : "bg-cyan-500 text-black"
      } rounded-full px-4 py-2 flex items-center justify-center gap-3 transition-all duration-300`}
      onClick={() => {
        itemExists ? console.log("YES") : console.log("NO");
        if (itemExists) {
          removeItem(id);
          triggerEvent("remove-from-cart", id);
        } else {
          addItem(id);
          triggerEvent("add-to-cart", id);
        }
      }}
    >
      <p className="text-sm font-bold">
        {itemExists ? "Remove from Cart" : "Add to Cart"}
      </p>
      <FaCartShopping size="25" />
    </button>
  );
};

export default CartButton;
