"use client";

import { useRouter } from "next/navigation";
import { items } from "@/public/items";
import { useContext, useEffect } from "react";
import Image from "next/image";
import CartContext from "@/app/components/context/CartContext";
import RateContext from "@/app/components/context/RateContext";
import CartButton from "@/app/components/cart/cartButton";
import Cart from "@/app/components/cart/cart";
import { Rating } from "@mui/material";
import UserStateContext from "@/app/components/context/UserStateContext";

const getItem = (id: string) => {
  const item = items.find((i) => i.id === parseInt(id));
  return item;
};

export default function Product({ params }: { params: { id: string } }) {
  const { addItem, removeItem, cartItems } = useContext(CartContext);
  const { itemRates, rateItem } = useContext(RateContext);
  const item = getItem(params.id);

  const { triggerEvent } = useContext(UserStateContext);

  useEffect(() => {
    triggerEvent("view-item", parseInt(params.id), undefined);
  }, []);

  // const { cart } = useContext(CartContext);
  const itemExists: boolean = cartItems?.hasOwnProperty(params.id);

  if (!item) {
    <Cart />;
    return <div>Item not found!</div>;
  }

  return (
    <div className="container max-w-screen-xl mx-auto px-4 bg-white py-10">
      <div className="grid mb-10 justify-end">
        <Cart />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
        <aside>
          <div className="border border-gray-200 shadow-sm p-3 text-center rounded mb-5">
            <Image
              className="object-cover inline-block"
              src={item?.image}
              alt="Product title"
              width="340"
              height="340"
            />
          </div>
        </aside>
        <main>
          <h2 className="font-semibold text-2xl mb-4">{item.title}</h2>

          <p className="mb-4 font-semibold text-xl">${item.price}</p>

          <p className="mb-20 text-gray-500 ">{item.description}</p>
          <RatingComponent
            rateValue={parseInt(itemRates[parseInt(params.id) - 1])}
            id={params.id}
            rateItem={rateItem}
          />
          <div className="flex flex-wrap gap-2 mb-5">
            <CartButton
              id={parseInt(params.id)}
              addItem={addItem}
              removeItem={removeItem}
              cartItems={cartItems}
            />
          </div>

          <ul className="mb-5">
            <li className="mb-1">
              {" "}
              <b className="font-medium w-36 inline-block">Seller / Brand:</b>
              <span className="text-gray-500">{item.company}</span>
            </li>
          </ul>
        </main>
      </div>

      {/* <NewReview /> */}
      <hr />
    </div>
  );
}

const RatingComponent = ({
  rateValue,
  id,
  rateItem,
}: // rateItem,
{
  rateValue: number;
  id: string;
  rateItem: (id: string, rate: string) => {};
}) => {
  return (
    <div className="mb-3">
      <Rating
        name="simple-controlled"
        value={rateValue}
        onChange={async (event, newValue) => {
          if (!newValue) return;

          rateItem(id, newValue.toString());
        }}
      />
    </div>
  );
};
