# Architecture Overview

The "Boughty" backend follows a modular, layered architecture designed for maintainability and scalability.

## Directory Structure

- `src/controllers/`: Handles incoming HTTP requests and structures the response.
- `src/services/`: Contains the core business logic and interacts with the database.
- `src/routes/`: Defines the API endpoints and maps them to controllers.
- `src/middlewares/`: Express middlewares for authentication and request processing.
- `src/validators/`: Input validation schemas using Zod.
- `prisma/`: Database schema and migration files.

## Data Models

Based on the Prisma schema, the system revolves around the following entities:

1. **User**: Stores profile information and credentials.
2. **Product**: Represents items available for purchase.
3. **CartItem**: Links users to products they intend to buy.
4. **Order**: Represents a completed transaction.
5. **OrderItem**: Captures product details at the time an order was placed.

## Request Lifecycle

1. **Routing**: An incoming request hits a route in `src/routes/`.
2. **Middleware**: (Optional) Validation or authentication guards (e.g., `authGuard`) process the request.
3. **Controller**: The controller extracts data from the request and calls the appropriate service.
4. **Service**: The service executes business logic and interacts with Prisma.
5. **Response**: The controller sends a JSON response back to the client.

## Security

Security is managed via JWT (JSON Web Tokens). The `authGuard` middleware ensures that protected routes are only accessible by users with a valid token.
