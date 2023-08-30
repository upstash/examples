"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { useToast } from "@/components/ui/use-toast";
import CartContext from "./CartContext";

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://careful-ladybug-31212.upstash.io",
  token:
    "AXnsACQgYjg5ZmZkYTUtZjg0OS00OTJmLTk4NGQtNWEzMDdlODdhNzg2N2VmNTNkYjkzZGUyNGU0N2FlODZmYTM0NmYwOTRkY2Y=",
});

type stateType =
  | "none"
  | "sign-up"
  | "sign-in"
  | "items-in-cart"
  | "blank-cart";
type eventType =
  | "sign-up"
  | "sign-in"
  | "sign-out"
  | "view-item"
  | "add-to-cart"
  | "remove-from-cart"
  | "cart-emptied"
  | "rate"
  | "checkout";

type mailType =
  | "item-interest"
  | "shipment"
  | "items-to-rate"
  | "forgot-items-in-cart";

interface UserStateContextProps {
  userState: stateType;
  triggerEvent: (event: eventType, id?: number, cart?: Item[]) => Promise<void>;
  recieveEmails: boolean;
  setRecieveEmails: (recieveEmails: boolean) => void;
}

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

const UserStateContext = createContext<UserStateContextProps>({
  userState: "none",
  triggerEvent: async (event, id, cart) => {},
  recieveEmails: false,
  setRecieveEmails: (recieveEmails: boolean) => {},
});

export const UserStateProvider: any = ({
  children,
  userId,
  user,
}: {
  children: any;
  userId: string;
  user: any;
}) => {
  let itemCount = 0;
  useEffect(() => {
    // fetchItemRates();
  }, [itemCount]);

  const [userState, setUserState] = useState<stateType>("none");
  const [recieveEmails, setRecieveEmails] = useState<boolean>(false);
  const { cart, cartItems } = useContext(CartContext);
  const { toast } = useToast();

  const triggerEvent = async (event: eventType, id?: number, cart?: Item[]) => {
    if (!recieveEmails) return;

    console.log(`EVENT: ${event}`);
    if (event === "view-item" && id) {
      redis.sadd(`item-interest:${userId}`, id);

      toast({
        title: "Scheduled",
        description: `Item with ID: ${id} is viewed! If it doesn't get added to cart in a day, notification will be sent!`,
      });

      fetch("/api/setSchedule", {
        method: "POST",
        body: JSON.stringify({
          mail_type: "item-interest",
          delay: "10s",
          user: {
            userID: userId,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            emailAddress: user.emailAddress,
          },
        }),
      });
    } else if (event === "add-to-cart" && id) {
      const interestedIn: number[] = await redis.smembers(
        `item-interest:${userId}`
      );

      if (interestedIn.includes(id)) {
        const newInterestedIn = interestedIn.filter((item) => {
          console.log(item, id);
          return item != id;
        });
        console.log(newInterestedIn);
        if (newInterestedIn.length !== 0) {
          toast({
            title: "Edited Schedule",
            description: `Item with ID ${id} is added to cart!. Here's the items that user is interested in but haven't added to cart: ${newInterestedIn.join(
              ", "
            )}`,
          });
        } else {
          console.log("HERE");
          toast({
            title: "Removed Schedule",
            description: `Item with ID: ${id} is added to cart!. Unscheduling the interest items mail.`,
          });
          fetch("/api/setSchedule", {
            method: "DELETE",
            body: JSON.stringify({
              mail_type: "item-interest",
              delay: "10s",
              user: {
                userID: userId,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                emailAddress: user.emailAddress,
              },
            }),
          });
        }

        redis.srem(`item-interest:${userId}`, id.toString());
      }
      setUserState("items-in-cart");
    } else if (event === "cart-emptied") {
      setUserState("blank-cart");
      fetch("/api/setSchedule", {
        method: "DELETE",
        body: JSON.stringify({
          mail_type: "forgot-items-in-cart",
          user: {
            userID: userId,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            emailAddress: user.emailAddress,
          },
        }),
      });
    } else if (event === "rate" && id) {
      const itemsToBeRated = await redis.smembers(`items-to-rate:${userId}`);

      if (!itemsToBeRated) return;

      const newToBeRated = itemsToBeRated.filter((item) => {
        console.log(item, id);
        return item != id.toString();
      });

      if (newToBeRated.length === 0) {
        console.log("ABORT MAIL!");
        toast({
          title: "Removed Schedule",
          description: `Item with ID: ${id} is rated. There's no item-to-be-rated. Aborting the scheduled mail`,
        });
        fetch("/api/setSchedule", {
          method: "DELETE",
          body: JSON.stringify({
            mail_type: "items-to-rate",
            user: {
              userID: userId,
              firstName: user.firstName,
              lastName: user.lastName,
              username: user.username,
              emailAddress: user.emailAddress,
            },
          }),
        });
      } else {
        console.log(newToBeRated);

        redis.srem(`items-to-rate:${userId}`, id);

        toast({
          title: "Scheduled",
          description: `Item with ID: ${id} is rated. And it's removed from the to-be-rated. New Items to rate are: ${newToBeRated.join(
            " "
          )}`,
        });
      }
    } else if (event === "checkout" && cart) {
      const itemIDs = cart?.map((item) => item.id);
      console.log(cart);
      toast({
        title: "Scheduled",
        description:
          "A 'Your items are shipped!' mail is scheduled with a delay of 24h. ",
      });

      fetch("/api/setSchedule", {
        method: "POST",
        body: JSON.stringify({
          mail_type: "shipment",
          items: itemIDs.map((item) => {
            return item.toString();
          }),
          delay: "1s",
          user: {
            userID: userId,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            emailAddress: user.emailAddress,
          },
        }),
      });

      toast({
        title: "Scheduled",
        description: `A 'You forgot to rate items!' mail is scheduled with a delay of 24h. The items are: ${itemIDs.join(
          ", "
        )} `,
      });
      fetch("/api/setSchedule", {
        method: "POST",
        body: JSON.stringify({
          mail_type: "items-to-rate",
          items: itemIDs,
          delay: "1s",
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            emailAddress: user.emailAddress,
          },
        }),
      });

      redis.sadd(`items-to-rate:${userId}`, ...itemIDs);
    }

    if (event === "sign-out" && cart) {
      console.log("SIGNED OUT");
      const itemIDs = cart?.map((item) => item.id);
      toast({
        title: "Scheduled",
        description:
          "A 'you forgot some items in your cart' mail is scheduled with a delay of 24h. ",
      });

      fetch("/api/setSchedule", {
        method: "POST",
        body: JSON.stringify({
          mail_type: "forgot-items-in-cart",
          items: itemIDs,
          delay: "1s",
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            emailAddress: user.emailAddress,
          },
        }),
      });
    }
  };

  return (
    <UserStateContext.Provider
      value={{ userState, triggerEvent, recieveEmails, setRecieveEmails }}
    >
      {children}
    </UserStateContext.Provider>
  );
};

export default UserStateContext;
