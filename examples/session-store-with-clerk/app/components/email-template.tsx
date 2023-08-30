import * as React from "react";
import { items } from "@/public/items";
import Image from "next/image";
import { Img } from "@react-email/img";

type mailType =
  | "item-interest"
  | "shipment"
  | "items-to-rate"
  | "forgot-items-in-cart";

interface EmailTemplateProps {
  user: any;
  mail_type: mailType;
  itemsData?: Item[];
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

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  user,
  mail_type,
  itemsData,
}) => {
  if (mail_type == "shipment" && itemsData) {
    //
    return (
      <div className="container">
        <h1>Shipping Notification</h1>
        <p>Your order has been shipped and will be arriving soon!</p>
        <h2>Order Details</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {itemsData.map((item, index) => (
              <tr key={index}>
                <td>
                  <a
                    href={`https://shopstash.vercel.app/products/${item.id}`}
                  ></a>
                </td>
                <td>${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p>
          Thank you for choosing us! If you have any questions or concerns,
          please contact our support team.
        </p>
      </div>
    );
  } else if (mail_type == "item-interest") {
    return (
      <div>
        <h2>Hey, {user.firstName}!</h2>
        <p>Check out these items, you may be interested in them:</p>
        <div className="items-list">
          {itemsData?.map((item) => {
            if (!item) return null;

            return (
              <div key={item.id} className="item">
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (mail_type == "items-to-rate") {
    return (
      <div>
        <h2>Hey, {user.firstName}!</h2>
        <p>
          We would love to hear your thoughts on the items you have recently
          interacted with. Please rate them:
        </p>
        <div className="items-list">
          {itemsData?.map((item) => {
            if (!item) return null;

            return (
              <div key={item.id} className="item">
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (mail_type == "forgot-items-in-cart") {
    return (
      <div>
        <h2>Hey, {user.firstName}!</h2>
        <p>
          It looks like you have logged out with some items still in your cart.
          Do not miss out on them!
        </p>
        <a href="https://shopstash.vercel.app">View My Cart</a>
        <p>
          If you have any questions or need assistance, please feel free to
          reach out to us.
        </p>
        <p>Happy shopping!</p>
      </div>
    );
  }
};
