# FashionStore

A responsive fashion e-commerce storefront built with **React 19 and Vite**. FashionStore provides a seamless shopping experience with product browsing, search and filtering, product details, wishlist management, a shopping cart, demo authentication, and a simulated checkout process.

The project demonstrates the core features of a modern e-commerce application using a component-based architecture, client-side routing, and browser-based state persistence.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Application Routes](#application-routes)
- [Data and State Management](#data-and-state-management)
- [Deployment](#deployment)
- [Limitations](#limitations)
- [License](#license)

## Overview

FashionStore is a front-end e-commerce application designed to simulate the essential functionality of an online fashion store. Users can explore products, view product details, save their favorites, manage their shopping cart, sign in through a demo login flow, and complete a simulated checkout.

The application is built with React and Vite, with Bootstrap and custom CSS for responsive styling. React Router handles navigation, while `localStorage` preserves selected shopping and session data between browser visits.

## Features

### Product Discovery
- Browse a product catalogue with product information and imagery.
- Filter products by category.
- Search for products.
- Sort products based on available sorting options.
- View product availability and stock status.
- Open individual product detail pages.

### Product Details
- View detailed product information.
- Select available product sizes.
- Navigate between the catalogue and individual product pages.

### Wishlist Management
- Add products to a wishlist.
- View saved products on a dedicated wishlist page.
- Persist wishlist data using browser `localStorage`.

### Shopping Cart
- Add products to the cart.
- Update item quantities.
- Remove individual items.
- View item totals and the overall cart total.
- Persist cart data across browser sessions.

### Authentication
- Demo email and password login.
- Persist the demo login session locally.
- Support a front-end authentication flow without a connected authentication service.

### Checkout
- Enter customer and shipping information.
- Validate checkout form fields.
- Enter payment-related information for the simulated checkout.
- Display an order confirmation page after the demo checkout flow.

### User Experience
- Responsive layouts for desktop, tablet, and mobile screens.
- Reusable React components.
- Client-side navigation with React Router.
- Bootstrap 5 styling combined with custom CSS.
- Local browser storage for persistent demo state.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Component-based user interface |
| Vite | Development server and production build tooling |
| React Router | Client-side routing and navigation |
| Bootstrap 5 | Responsive layout and UI styling |
| Custom CSS | Application-specific styling |
| React Hook Form | Form state management and validation |
| `localStorage` | Persistent client-side demo state |
| Oxlint | Code linting |
| Unsplash | Product imagery |

## Getting Started

Follow these steps to run FashionStore on your local machine.

### Prerequisites

Ensure the following tools are installed:

- **Node.js:** Version 18 or newer
- **npm:** Included with Node.js
- **Git:** Required to clone the repository

Verify your installations:

```bash
node --version
npm --version
git --version
```

### 1. Clone the Repository

```bash
git clone https://github.com/Dhanush616/fashion-store.git
```

### 2. Navigate to the Project Directory

```bash
cd fashion-store
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Vite will display the local development URL in your terminal. The default URL is usually:

```text
http://localhost:5173
```

Open the URL in your browser to explore the application.

## Available Scripts

Run the following commands from the project root.

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates an optimized production build |
| `npm run preview` | Serves the production build locally for preview |
| `npm run lint` | Runs the project's linting checks |

To verify the production build, run:

```bash
npm run build
npm run preview
```

## Project Structure

The application follows a modular structure that separates reusable components, application state, pages, and utility logic.

```text
fashion-store/
├── public/                 Static assets
├── src/
│   ├── components/         Reusable UI components
│   ├── context/             Authentication, cart, and wishlist state
│   ├── hooks/               Shared React hooks
│   ├── pages/               Route-level page components
│   ├── services/            Product data and related helpers
│   ├── utils/               Pricing and calculation utilities
│   ├── App.jsx               Application routes and providers
│   ├── App.css               Application-specific styles
│   └── main.jsx              Application entry point
├── index.html                HTML entry point
├── package.json              Dependencies and npm scripts
├── package-lock.json         Locked dependency versions
└── vite.config.js             Vite configuration
```

The structure above describes the main application organization. Additional configuration files may be present in the repository.

## Application Routes

FashionStore uses React Router to provide client-side navigation between the following pages.

| Route | Description |
|---|---|
| `/` | Home page with featured products and category navigation |
| `/catalogue` | Product catalogue with search, filtering, and sorting |
| `/product/:id` | Individual product details and size selection |
| `/wishlist` | Saved products |
| `/cart` | Cart items, quantities, and totals |
| `/login` | Demo login page |
| `/checkout` | Customer, shipping, and payment-related form |
| `/success` | Simulated order confirmation |

## Data and State Management

### Product Catalogue

Product data is defined locally in:

```text
src/services/products.js
```

This allows the storefront to display and manage product information without requiring a remote product API.

### Browser Storage

The application uses the browser's `localStorage` to retain selected demo data between sessions.

| Storage Key | Purpose |
|---|---|
| `fs_cart` | Shopping cart items |
| `fs_wishlist` | Saved product IDs |
| `fs_user` | Demo login session |
| `fs_last_order` | Most recent simulated order |

### Resetting Application Data

To reset the stored demo state:

1. Open the application in your browser.
2. Open Developer Tools.
3. Navigate to the browser's storage or application panel.
4. Select the site's local storage.
5. Remove the relevant `fs_` entries or clear the site's local storage.

Reload the application to start with a fresh demo state.

## Deployment

FashionStore can be deployed to [Vercel](https://vercel.com/) using the connected GitHub repository.

### Deploy Using Vercel

1. Push the project to a GitHub repository.
2. Sign in to Vercel.
3. Select **Add New Project**.
4. Import the repository: [Dhanush616/fashion-store](https://github.com/Dhanush616/fashion-store).
5. Confirm the project configuration.
6. Select **Deploy**.

Use the following settings if Vercel does not detect them automatically.

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Once deployment completes, Vercel will provide a URL for the hosted application.

For more information, refer to the [Vercel documentation](https://vercel.com/docs).

## Limitations

FashionStore is a front-end demonstration project. Its current functionality is intended for learning and demonstration rather than production commerce.

- **Authentication:** Login is simulated locally. No real authentication provider or server-side session management is connected.
- **Product data:** The catalogue is maintained locally rather than retrieved from a product database or external API.
- **Cart and wishlist:** Data is stored in the current browser's `localStorage` and is not synchronized across devices.
- **Checkout:** The checkout flow demonstrates form validation and order confirmation without creating a real order.
- **Payments:** No payment gateway is integrated, and no actual payment is processed.
- **Order management:** Order information is
