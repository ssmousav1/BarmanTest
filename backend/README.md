# E-Commerce Backend

This is the backend API for the e-commerce product page application built with Nest.js.

## Features

- REST API for product management
- SQLite database with TypeORM
- AI-powered product summaries and review insights using LangChain and Firework ai
- Product reviews system
- Input validation
- CORS enabled
- Database seeding with sample data

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firework ai API key (optional, for AI features)

## Installation

```bash
npm install
```

## Configuration


1. Add your  `.env` file:
   ```
   # FIREWORKS_API_KEY for AI features
   FIREWORKS_API_KEY=fw_3ZYnF6PW5p23wrZ9AayNeFRT

   # Server Port
   PORT=3001

   # Database Configuration
   # SQLite database file will be created automatically
   DB_NAME=ecommerce.db
   ```

   Note: The application will still work without an firework api key, but AI features will return fallback responses.

## Database

The application uses SQLite database with TypeORM. The database file (`ecommerce.db`) will be created automatically when you first run the application. The database is seeded with sample products and reviews for test purposes.

## Running the application

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

The server will run on `http://localhost:3001` by default.

## API Endpoints

### Products

- `GET /products` - Get all products
- `GET /products/:id` - Get a single product
- `POST /products` - Create a new product
- `GET /products/:id/reviews` - Get reviews for a product
- `POST /products/:id/reviews` - Add a review to a product

### AI

- `POST /ai/summary` - Generate AI-powered product summary and review insights

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```