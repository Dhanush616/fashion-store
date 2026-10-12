# FashionStore

A responsive fashion e-commerce storefront built with React and Vite. FashionStore includes a browsable product catalogue, product details, wishlist and cart management, a demo login flow, and a simulated checkout experience.

## Live Demo

Deploy the project to Vercel using the instructions below, or run it locally with the commands in the [Getting Started](#getting-started) section.

## Features

- Responsive storefront layout with Bootstrap and custom CSS
- Home page with featured products and category navigation
- Product catalogue with:
  - Category filtering
  - Search
  - Sorting
  - Stock status
- Product detail pages with size selection and product information
- Wishlist support with a wishlist page
- Shopping cart with quantity updates, item removal, and totals
- Cart and wishlist state persisted in `localStorage`
- Demo email/password login with a persisted local session
- Checkout form with customer, shipping, and payment-field validation
- Simulated order confirmation page
- Client-side routing with React Router

> **Demo note:** This is a front-end demonstration project. Login, checkout, and payment processing are simulated locally. No real authentication, database, order API, or payment gateway is connected.

## Tech Stack

- React 19
- Vite
- React Router
- Bootstrap 5
- React Hook Form
- Oxlint
- Unsplash image URLs for product imagery

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
git clone https://github.com/Dhanush616/fashion-store.git
cd fashion-store
npm install
```

### Run the development server

```bash
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

## Vercel Deployment

1. Open [Vercel](https://vercel.com/) and select **Add New Project**.
2. Import the [`Dhanush616/fashion-store`](https://github.com/Dhanush616/fashion-store) GitHub repository.
3. Vercel should detect the Vite project automatically.
4. Use the following settings if they are not detected:

   | Setting | Value |
   | --- | --- |
   | Framework Preset | Vite |
   | Install Command | `npm install` |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |

5. Select **Deploy**.

## Project Structure

```text
src/
├── components/       Reusable UI components
├── context/          Auth, cart, and wishlist state providers
├── hooks/            Shared React hooks
├── pages/            Route-level page views
├── services/         Product catalogue data and helpers
├── utils/            Pricing and calculation helpers
├── App.jsx           Application routes and providers
├── App.css           Application-specific styles
└── main.jsx          React application entry point
```

## Available Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/catalogue` | Product catalogue |
| `/product/:id` | Product details |
| `/wishlist` | Saved products |
| `/cart` | Shopping cart |
| `/login` | Demo login |
| `/checkout` | Shipping and payment form |
| `/success` | Simulated order confirmation |

## Data and Browser Storage

Product data is defined locally in `src/services/products.js`. The app stores the following demo state in the browser's `localStorage`:

- `fs_cart` — cart items
- `fs_wishlist` — wishlist product IDs
- `fs_user` — demo login session
- `fs_last_order` — most recent simulated order

To reset the demo state, clear the site's local storage in your browser's developer tools.

## License

This project is provided for demonstration and educational purposes.
