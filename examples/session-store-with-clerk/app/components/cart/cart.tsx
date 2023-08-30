"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import DeleteItemButton from "./delete-item-button";
import { useContext } from "react";
import { FaCartShopping } from "react-icons/fa6";

import Link from "next/link";
import Image from "next/image";
import CartContext from "../context/CartContext";
import RateContext from "../context/RateContext";
import QuantityButton from "./quantity-button";

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

const mapIdsToObjects = (products: Item[], ids: number[]): Item[] => {
  const mappedItems: Item[] = [];
  for (const id of ids) {
    const product = products.find((p) => p.id === id);
    if (product) {
      mappedItems.push(product);
    }
  }
  return mappedItems;
};

export default function Cart() {
  const { addItem, removeItem, resetCart, cart, cartItems, checkout } =
    useContext(CartContext);
  cart.sort((a: Item, b: Item) => {
    return a.id - b.id;
  });
  return (
    <>
      <Sheet>
        <SheetTrigger className="border border-gray-400 p-2 rounded-md">
          <FaCartShopping size="30" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <div className="">
                <p className="text-3xl mb-6">My Cart</p>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="h-[100%] flex flex-col justify-end align-end">
            {!cart || cart.length === 0 ? (
              <div className="h-full mt-20 flex  flex-col items-center justify-start ">
                <FaCartShopping size="75" />
                <p className="mt-6 text-center text-2xl font-bold">
                  Your cart is empty.
                </p>
              </div>
            ) : (
              <div className="flex  flex-col justify-between  py-4 h-[100%]  ">
                <ul className="h-[78.7%] w-[100%] overflow-scroll ">
                  {cart.map((item) => {
                    return (
                      <li
                        className="gap-3 w-[95%]  border-b border-neutral-300 dark:border-neutral-700 py-4 px-2 grid grid-flow-col grid-cols-min transition-all ease-in-out"
                        key={item.id}
                      >
                        <div>
                          <Link
                            href={`products/${item.id}`}
                            className="z-30 flex  space-x-4 align-center"
                          >
                            <div className="relative h-full w-[4.5rem] cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                              <Image
                                className="h-full w-full object-cover "
                                width={68}
                                height={68}
                                alt={item.title}
                                src={item.image}
                              />
                            </div>
                          </Link>
                          <div className="relative  mt-[-77px] ml-[60px]">
                            <DeleteItemButton
                              deleteItem={removeItem}
                              id={item.id}
                            />
                          </div>
                        </div>

                        <div className=" flex  flex-col text-base">
                          <span className="leading-tight">{item.title}</span>
                        </div>
                        <div className="grid grid-flow-row grid-rows-2">
                          <div className="flex  justify-end space-y-2 text-right text-m font-bold">
                            ${item.price}
                          </div>

                          <QuantityButton
                            addItem={addItem}
                            removeItem={removeItem}
                            id={item.id}
                            quantity={cartItems[item.id]}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div
                  className="flex flex-col align-center justify-center  gap-6 mb-12 "
                  key="reset"
                >
                  <div className="flex justify-between border-t border-b border-neutral-500 py-4">
                    <p className="font-bold">TOTAL</p>
                    <p>
                      $
                      {cart
                        .reduce(
                          (acc, item) => acc + cartItems[item.id] * item.price,
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-center flex-row gap-4">
                    <button
                      className="rounded-full bg-black box-border px-4 py-2 mb-4  "
                      onClick={() => {
                        resetCart();
                      }}
                    >
                      <p className="text-white box-content font-bold">
                        RESET CART
                      </p>
                    </button>
                    <button
                      className="rounded-full bg-blue-500 box-border px-4 py-2 mb-4"
                      onClick={() => {
                        checkout();
                      }}
                    >
                      <p className="text-white box-content font-bold">
                        CHECKOUT
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
