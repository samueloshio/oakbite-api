# OakBite Backend API Documentation

## Introduction

Welcome to the OakBite Backend API Documentation. OakBite is a multivendor food e-commerce application designed to provide a platform for various food vendors to sell their products online. It provides endpoints for managing users, restaurants, orders, categories, drivers, ratings, and other related functionalities. This documentation serves as a guide for developers to interact with OakBite's backend API.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Folder Structure

```
oakbite-api/
|
├── config/
|   └── dbConfig.js
|
├── controllers/
|   ├── categoryController.js
|   ├── foodController.js
│   └── restaurantController.js
|
├── middleware/
│
│
├── models/
│   ├── CategoryModel.js
│   ├── FoodModel.js
|   ├── RestaurantModel.js
│   └── UserModelor.js
|
├── routes/
|   ├── categoryRoutes.js
|   ├── foodRoutes.js
│   └── restaurantRoutes.js
|
├── utils/
|
├── .env
├── .gitignore
├── app.js
└── package.json
```

## Getting Started

To get started with OakBite backend development, follow these steps:

**1.** Clone the OakBite backend repository from GitHub:

```bash
git clone https://github.com/samueloshio/oakbite-api.git
```

**2.** Navigate to the project directory:

```bash
cd oakbite-api
```

**3.** Install dependencies:

```bash
npm install
```

**4.** Set up environment variables:

- Create a .env file in the root directory.
- Define the following environment variables in the .env file:

```makefile
PORT=3000
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
```

**5.** Start the server:

```bash
npm start
```

**6.** The server will start running on http://localhost:3000 by default.

## Authentication

OakBite API uses JWT (JSON Web Tokens) for authentication. To access protected routes, clients must include a valid JWT token in the request headers.

### Authentication Endpoints

- '**POST /api/auth/register**': Register a new user.
- '**POST /api/auth/login**': Log in an existing user and obtain a JWT token.
- '**GET /api/auth/logout**': Log out the current user.

## User Management

The OakBite API provides endpoints for managing user accounts.

### User Endpoints

- '**GET /api/users/:id**': Get user details by ID.
- '**PUT /api/users/:id**': Update user details.
- '**DELETE /api/users/:id**': Delete a user account.

## Vendor Management

OakBite allows vendors to register and manage their accounts.

### Vendor Endpoints

- '**GET /api/vendors/:id**': Get vendor details by ID.
- '**PUT /api/vendors/:id**': Update vendor details.
- '**DELETE /api/vendors/:id**': Delete a vendor account.

## Product Management

Vendors can add, update, and delete their products through the OakBite API.

### Product Endpoints

- '**GET /api/products**': Get all products.
- '**GET /api/products/:id**': Get product details by ID.
- '**POST /api/products**': Add a new product.
- '**PUT /api/products/:id**': Update product details.
- '**DELETE /api/products/:id**': Delete a product.

## Order Management

OakBite allows users to place orders for products.

### Order Endpoints

- '**GET /api/orders**': Get all orders.
- '**GET /api/orders/:id**': Get order details by ID.
- '**POST /api/orders**': Place a new order.
- '**PUT /api/orders/:id**': Update order details.
- '**DELETE /api/orders/:id**': Delete an order.

## Category Management

Products in OakBite are organized into categories.

### Category Endpoints

- '**GET /api/categories**': Get all categories.
- '**GET /api/categories/:id**': Get category details by ID.
- '**POST /api/categories**': Add a new category.
- '**PUT /api/categories/:id**': Update category details.
- '**DELETE /api/categories/:id**': Delete a category.

## Error Handling

OakBite API follows RESTful principles for error handling. Errors are returned with appropriate HTTP status codes and error messages in JSON format.

## Rate Limiting

To prevent abuse and ensure fair usage, OakBite API implements rate limiting. Clients are limited to a certain number of requests per time period. Exceeding this limit will result in HTTP status code 429 (Too Many Requests).

## Conclusion

This concludes the documentation for the OakBite Backend API. Developers can use this documentation to integrate OakBite's backend services into their applications and build rich food e-commerce experiences.
