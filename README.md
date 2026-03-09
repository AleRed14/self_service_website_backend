# Self-Service Kiosk Backend

A robust backend REST API built for a self-service product purchasing kiosk, similar to those found in modern fast-food chains. It features product management, sales transactions, user authentication, and Excel export capabilities.

## 🚀 Tech Stack

* **Runtime:** Node.js
* **Language:** TypeScript
* **Framework:** Express.js
* **Database:** MySQL (using `mysql2`)
* **Templating Engine:** EJS
* **Security:** bcrypt (password hashing), express-session
* **Utilities:** ExcelJS (for exporting reports)

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:
* Node.js (v18 or higher recommended)
* MySQL Server running locally or remotely

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
SESSION_KEY=your_super_secret_session_key
```

## 🛠️ Installation & Setup

### 1. **Clone the repository:**
```Bash

git clone [https://github.com/AleRed14/self_service_website.git](https://github.com/AleRed14/self_service_website.git)
cd self_service_website
```
### 2. **Install dependencies:**
```Bash

npm install
```
### 3. **Run the development server:**
```Bash

npm run dev
```
### 4. **Build for production:**
```Bash

npm run build
npm start
```
## 🗂️ Core API Endpoints
### **Products**

* `GET /api/products` - Retrieve a paginated list of active products.

* `GET /api/products/:id` - Retrieve a specific product by ID.

* `POST /api/products` - Create a new product.

* `PUT /api/products` - Update an existing product.

* `DELETE /api/products/:id` - Soft delete a product.

* `GET /api/products/export/products` - Export all active products to an Excel file.

### **Sales**

* `POST /api/sales` - Process a new sale and link purchased products.

* `GET /api/sales/export/sales` - Export a full report of all sales to an Excel file.

### **Authentication & Users**

* `POST /api/users` - Register a new user.

* `POST /login` - Authenticate a user and create a session.

* `POST /logout` - Destroy the current session.

## 👨‍💻 Author

Created by Alejo - Universidad Tecnológica Nacional (UTN)