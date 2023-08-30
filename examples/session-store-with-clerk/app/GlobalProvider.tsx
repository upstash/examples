import { CartProvider } from "./components/context/CartContext";
import { RateProvider } from "./components/context/RateContext";
import { UserStateProvider } from "./components/context/UserStateContext";
import { auth, currentUser } from "@clerk/nextjs";

export async function GlobalProvider({ children }: { children: any }) {
  const { userId } = auth();
  const user = await currentUser();
  const userData = user
    ? {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        emailAddress: user.emailAddresses[0].emailAddress,
      }
    : {
        firstName: "none",
        lastName: "none",
        username: "none",
        emailAddress: "none",
      };
  return (
    <UserStateProvider userId={userId} user={userData}>
      <CartProvider userId={userId}>
        <RateProvider userId={userId}>{children}</RateProvider>
      </CartProvider>
    </UserStateProvider>
  );
}
