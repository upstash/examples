import { useTransition } from "react";
import { useRouter } from "next/router";

import { FaX } from "react-icons/fa6";
type Item = {
  id: number;
  title: string;
  image: string;
  description: string;
  company: string;
  price: number;
};

export default function DeleteItemButton({
  deleteItem,
  id,
}: {
  deleteItem: (id: number, force: boolean) => void;
  id: number;
}) {
  return (
    <>
      <button
        aria-label="Remove cart item"
        className="ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-black transition-all duration-200"
        type="button"
        onClick={() => {
          deleteItem(id, true);
        }}
      >
        <div className="hover:text-accent-3 mx-[2px] my-[5px]  text-white dark:text-black flex align-center justify-center">
          <FaX size="11" />
        </div>
      </button>
    </>
  );
}
