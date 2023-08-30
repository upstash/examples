import { currentUser } from "@clerk/nextjs";
import CardComponent from "./components/card";
import Cart from "./components/cart/cart";
import { items } from "@/public/items";

export default async function Home() {
    const user = await currentUser();

    if (!user)
        return (
            <div>
                <h1 className="text-2xl font-semibold mt-10">
                    Please sign in to start shopping!
                </h1>
            </div>
        );

    return (
        <div className="">
            <div className="flex items-center justify-between mb-5 mt-5 align-center">
                <h1 className="text-2xl mb-5 align-center">
                    Welcome to shop,
                    <span className=" font-bold"> {user?.firstName}</span>
                </h1>
                <div className="flex align-self-begin justify-self-begin">
                    <Cart />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
                {items.map((item) => {
                    return <CardComponent item={item} key={item.id} />;
                })}
            </div>
        </div>
    );
}
