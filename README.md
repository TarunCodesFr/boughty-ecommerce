# Boughty Backend

The backend for Boughty, This is basically a learning project of mine where i built this ecommerce backend in PERN Stack for fun, this has almost all the basic features a ecommerce platform has except the payment gateway to pay for orders.

## Features

- **Authentication**: JWT-based user registration and login.
- **Product Management**: Create, read, and update products.
- **Cart System**: Add, update, and remove items from the shopping cart.
- **Order Processing**: Create and view order history.
- **Role-Based Access**: Distinguishes between standard users and administrators.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database ORM**: Prisma (PostgreSQL)
- **Language**: TypeScript
- **Validation**: Zod
- **Security**: JWT, Bcrypt

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database

### Installation

1. Clone the repository.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up your environment variables (see `.env.example`).
4. Initialize the database:
    ```bash
    npx prisma migrate dev
    ```

### Development

Run the development server with live reload:

```bash
npm run dev
```

## Documentation

For more detailed information, please refer to:

- [API Reference](docs/API_REFERENCE.md)
- [Architecture & Design](docs/ARCHITECTURE.md)
