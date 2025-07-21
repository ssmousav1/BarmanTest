# E-Commerce Frontend

This is the frontend application for the e-commerce product page built with Next.js and React.

## Features

- Product listing page
- Product detail page with image gallery
- Product options selector (size, color)
- Customer reviews and ratings
- AI-powered product insights
- Add new products
- Responsive design with Tailwind CSS
- Context API for state management

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- use wsl or delete package.lock befor installing
- Backend server running on `http://localhost:3001`

## Installation

```bash
npm install
```

## Running the application

```bash
# development mode
npm run dev

# build for production
npm run build

# start production server
npm start
```

The application will run on `http://localhost:3010` by default.

## Pages

### Home Page (`/`)
- Displays all products in a grid layout
- "Add Product" button to create new products
- Click on any product to view details

### Product Detail Page (`/products/:id`)
- Product images with gallery
- Product information
- Size and color options selector
- Customer reviews section
- AI Assistant showing product summary and review insights
- Add review functionality

## Components

- **ProductCard**: Displays product in the grid
- **ProductDetail**: Shows detailed product information
- **OptionsSelector**: Allows selection of size and color
- **Reviews**: Displays and manages product reviews
- **AIAssistant**: Shows AI-generated insights
- **NewProductModal**: Form to add new products

## State Management

The application uses React Context API for global state management through the `ProductContext`.

## Styling

The application uses Tailwind CSS for styling with a clean, modern design.