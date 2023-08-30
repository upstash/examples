"use client";

import { useClerk } from "@clerk/nextjs";
import { useContext } from "react";
import CartContext from "./context/CartContext";
import UserStateContext from "./context/UserStateContext";

export default function SignOutButton() {
  const { cart } = useContext(CartContext);
  const { triggerEvent } = useContext(UserStateContext);

  const { signOut } = useClerk();

  return (
    <>
      <button
        onClick={() => {
          signOut();
          triggerEvent("sign-out", undefined, cart);
        }}
        className="mr-5"
      >
        Sign Out
      </button>
    </>
  );
}
