---
title: Shopping App
products: ["redis", "qstash"]
stack: ["Next.js"]
use_cases: ["Session Management"]
languages: ["ts"]
preview_url: "https://shop.upstash.app"
blog_url: "https://upstash.com/blog/session-store-with-clerk"
author: "fahreddinozcan"
---

<br />
<div align="center">

  <h3 align="center">Shopping App with Clerk</h3>

  <p align="center">
		This example shows you how to build a shopping app using Clerk, Next.js, and Upstash Redis. It covers user authentication, shopping cart management, email scheduling via QStash, and rate-limiting with Upstash Ratelimit. We focus on using Redis for real-time, stateful applications, specifically for e-commerce.
  </p>
</div>

## Overview

This repository contains a comprehensive shopping application, built to demonstrate the power of combining several key technologies. It serves as a hands-on guide for integrating Clerk for user authentication, Next.js for frontend UI, Upstash Redis for backend data storage, QStash for email scheduling, and Upstash Ratelimit for rate-limiting.

## Key Technologies

- Clerk: For secure user authentication, including sign-up, sign-in, and sign-out processes.
- Next.js: As the frontend framework to build a reactive user interface.
  Upstash Redis: As the backend datastore for managing user sessions and cart data.
- QStash: For scheduling emails based on user interactions.
- Upstash Ratelimit: To implement rate-limiting features for preventing misuse.

## Features

### User Authentication

- Securely register new users.
- Sign in existing users.
- Sign out from the application.

### Shopping Cart

- Add items to a unique cart for each user.
- Remove items from the cart.
- Modify the quantity of items in the cart.

### Email Scheduling

- Schedule emails based on certain user actions using QStash.
- Emails are dispatched by Resend.

### User Ratings

- Users have the option to rate items.
- Ratings are stored efficiently in Upstash Redis.

### Rate-Limiting

- Utilizes Upstash Ratelimit to manage the rate of user interactions, such as rating items, to prevent misuse.

## How to Get Started

- Clone the repository.
- Install dependencies by running npm install.
- Set up your Clerk, Upstash Redis, QStash, and Upstash Ratelimit accounts.
- Populate the .env file with your API keys.
- Run the project locally using npm run dev.
- Feel free to clone, modify, and deploy this project as per your requirements.

### Learn More

To learn more about Upstash and its services, check out the following resources:

- [Documentation](https://docs.upstash.com)
- [Website](https://upstash.com)
- [Blog](https://upstash.com/blog)
- [Console](https://console.upstash.com)
- [Discord](https://upstash.com/discord)
