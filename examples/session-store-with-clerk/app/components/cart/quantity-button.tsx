"use client";

import { FaPlus, FaMinus } from "react-icons/fa6";
import { idText } from "typescript";

export default function QuantityButton({
    addItem,
    removeItem,
    quantity,
    id,
}: {
    addItem: (id: number) => {};
    removeItem: (id: number) => {};
    quantity: number;
    id: number;
}) {
    return (
        <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200">
            <button
                className="px-2"
                onClick={() => {
                    removeItem(id);
                }}
            >
                <FaMinus color="#404040" />
            </button>
            <p className="w-6 text-center">
                <span className="w-full text-sm">{quantity}</span>
            </p>
            <button
                className="px-2"
                onClick={() => {
                    addItem(id);
                }}
            >
                <FaPlus color="#404040" />
            </button>
        </div>
    );
}
