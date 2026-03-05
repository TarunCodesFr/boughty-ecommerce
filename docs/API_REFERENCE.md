# API Reference

All API endpoints are prefixed with `/api`.

## Authentication

### POST `/api/auth/register`

Registers a new user.

- **Body**: `{ "username": "...", "email": "...", "password": "..." }`
- **Response**: `201 Created`

### POST `/api/auth/login`

Authenticates a user and returns a JWT.

- **Body**: `{ "email": "...", "password": "..." }`
- **Response**: `200 OK` with `{ "token": "...", "role": "..." }`

### GET `/api/auth/me`

Returns the currently authenticated user's profile.

- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`

---

## Products

### GET `/api/products`

Retrieves a list of all products.

### GET `/api/products/:id`

Retrieves detailed information for a specific product.

### POST `/api/create-product`

Creates a new product. (Admin only)

- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "name": "...", "description": "...", "price": ... }`

---

## Shopping Cart

### GET `/api/cart`

Retrieves the user's current cart items.

- **Headers**: `Authorization: Bearer <token>`

### POST `/api/cart`

Adds an item to the cart.

- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "productId": ..., "quantity": ... }`

---

## Orders

### POST `/api/orders`

Places a new order based on the current cart.

- **Headers**: `Authorization: Bearer <token>`

### GET `/api/orders`

Retrieves the user's order history.

- **Headers**: `Authorization: Bearer <token>`
