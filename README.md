# SpendWise - Personal Expense Tracker API

A simple Expense Tracker REST API built with Node.js and PostgreSQL. It supports authentication, expense management, and summary reporting.

## Features

*   User registration and JWT-based authentication.
*   CRUD operations for expenses.
*   List expenses with filtering and pagination.
*   Get a summary of total income, expenses, and balance.
*   API documentation with Swagger.

## Setup and Run

### Prerequisites

*   [Node.js](https://nodejs.org/) (v14 or later)
*   [PostgreSQL](https://www.postgresql.org/)

### Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd Backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables. Replace the values with your PostgreSQL database configuration.

    ```
    PORT=5000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    JWT_SECRET=your_jwt_secret
    ```

4.  **Run database migrations:**
    This will create the necessary tables in your database.
    ```bash
    npm run migrate
    ```

5.  **Start the server:**
    *   For development (with auto-reloading):
        ```bash
        npm run dev
        ```
    *   For production:
        ```bash
        npm start
        ```

The API will be running at `http://localhost:5000`. You can view the interactive API documentation at `http://localhost:5000/docs`.

## API Endpoints

The base URL for all endpoints is `http://localhost:5000`.

### Health

*   **GET /health**
    *   **Description:** Checks the health of the API.
    *   **Example Response:**
        ```json
        {
          "status": "OK"
        }
        ```

### Authentication

*   **POST /auth/reg**
    *   **Description:** Register a new user.
    *   **Example Request:**
        ```json
        {
          "username": "testuser",
          "email": "test@example.com",
          "password": "password123"
        }
        ```
    *   **Example Response (201 Created):**
        ```json
        {
          "message": "User created successfully",
          "user": {
            "id": "18344136-3158-4815-b26b-1522508c6bd4",
            "username": "testuser",
            "email": "test@example.com"
          }
        }
        ```

*   **POST /auth/login**
    *   **Description:** Login a registered user.
    *   **Example Request:**
        ```json
        {
          "email": "test@example.com",
          "password": "password123"
        }
        ```
    *   **Example Response (200 OK):**
        ```json
        {
          "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          "user": {
            "id": "18344136-3158-4815-b26b-1522508c6bd4",
            "username": "testuser",
            "email": "test@example.com"
          }
        }
        ```

### User

*   **GET /profile**
    *   **Description:** Get the profile of the logged-in user.
    *   **Authentication:** Bearer Token required.
    *   **Example Response (200 OK):**
        ```json
        {
          "id": "18344136-3158-4815-b26b-1522508c6bd4",
          "username": "testuser",
          "email": "test@example.com"
        }
        ```

### Expenses

*   **POST /expenses**
    *   **Description:** Create a new expense.
    *   **Authentication:** Bearer Token required.
    *   **Example Request:**
        ```json
        {
          "title": "Monthly Salary",
          "amount": 5000,
          "category": "salary",
          "type": "income"
        }
        ```
    *   **Example Response (201 Created):**
        ```json
        {
          "id": "f433ce2f-0e52-4079-ad74-6a5e7f684092",
          "user_id": "18344136-3158-4815-b26b-1522508c6bd4",
          "title": "Monthly Salary",
          "amount": 5000,
          "category": "salary",
          "type": "income",
          "note": null,
          "is_large": true,
          "created_at": "2025-10-23T18:42:00Z"
        }
        ```

*   **GET /expenses**
    *   **Description:** Get all expenses for the logged-in user. Supports pagination and filtering.
    *   **Authentication:** Bearer Token required.
    *   **Query Parameters:** `page`, `limit`, `type`, `category`.
    *   **Example Response (200 OK):**
        ```json
        {
          "total": 1,
          "data": [
            {
              "id": "f433ce2f-0e52-4079-ad74-6a5e7f684092",
              "user_id": "18344136-3158-4815-b26b-1522508c6bd4",
              "title": "Monthly Salary",
              "amount": 5000,
              "category": "salary",
              "type": "income",
              "note": null,
              "is_large": true,
              "created_at": "2025-10-23T18:42:00Z"
            }
          ]
        }
        ```

*   **PATCH /expenses/{id}**
    *   **Description:** Update an existing expense by its ID.
    *   **Authentication:** Bearer Token required.
    *   **Example Request:**
        ```json
        {
          "amount": 5500
        }
        ```
    *   **Example Response (200 OK):**
        ```json
        {
          "id": "f433ce2f-0e52-4079-ad74-6a5e7f684092",
          "user_id": "18344136-3158-4815-b26b-1522508c6bd4",
          "title": "Monthly Salary",
          "amount": 5500,
          "category": "salary",
          "type": "income",
          "note": null,
          "is_large": true,
          "created_at": "2025-10-23T18:42:00Z"
        }
        ```

*   **DELETE /expenses/{id}**
    *   **Description:** Delete an expense by its ID.
    *   **Authentication:** Bearer Token required.
    *   **Example Response (200 OK):**
        ```json
        {
          "message": "Expense deleted successfully"
        }
        ```

*   **GET /expenses/summary**
    *   **Description:** Get a summary of the user's expenses.
    *   **Authentication:** Bearer Token required.
    *   **Example Response (200 OK):**
        ```json
        {
          "total_income": 5500,
          "total_expense": 0,
          "balance": 5500
        }
        ```

## Known Issues or Trade-offs

*   **Security:** The current implementation does not include refresh tokens. Access tokens have a limited lifetime, and users will need to log in again once they expire. For production environments, it is crucial to enable HTTPS to protect credentials and tokens in transit.
*   **Error Handling:** The API provides generic 500 Internal Server Error responses. More specific error messages could be implemented to improve the developer experience.
*   **`is_large` Flag:** The `Expense` model contains an `is_large` boolean flag. The logic for this is in `src/models/expense.js` and it is set to true if the amount is greater than 1000. This threshold is arbitrary and could be made configurable.
