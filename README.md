Of course! Adding direct links for the admin panel and the user login page makes the project much easier to test and demonstrate.

Here is the updated README with a new section for direct access links.

# 🍔 Full-Stack Food Delivery Website

This is a complete MERN stack food delivery application featuring a customer-facing frontend, a powerful admin panel, and a robust backend. Users can browse food items, add them to a cart, place orders, and pay online, while administrators can manage products and track orders.

### **Live Demo & Access Links**

*   [**➥ Live Demo (Customer View)**](https://food-del-fronted-slyl.onrender.com/) 
*   [**➥ Admin Panel**](https://food-del-admin-qnsc.onrender.com/) *(Replace with your deployed admin URL)*

### **Features**
*   **Dynamic Frontend**: A responsive and interactive user interface built with React.
*   **Admin Dashboard**: A separate panel for administrators to add, view, and manage food items and orders.
*   **Full-Stack Functionality**: Complete integration between the frontend, backend, and database.
*   **Database Integration**: MongoDB Atlas is used to store user, product, and order data.
*   **User Authentication**: Users can sign up, log in, and manage their profiles.
*   **Shopping Cart**: A fully functional cart to add and manage items before checkout.
*   **Order Management**: Track orders in real-time from placement to delivery.
*   **Online Payments**: Integrated with Stripe for secure online payment processing.

### **Tech Stack**
*   **Frontend**: React
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB (with Mongoose)
*   **Payment Gateway**: Stripe

## **🚀 Setup and Installation Guide**

Follow these steps to get the project up and running on your local machine.

### **1. Prerequisites**
Before you begin, ensure you have **Node.js** installed on your system. If not, you can download it from the [official Node.js website](https://nodejs.org/en/download).

### **2. Environment Setup**
This project requires API keys from MongoDB and Stripe.

#### **MongoDB Atlas Setup**
1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2.  Create a new **M0 (Free)** cluster.
3.  Create a **database user** with a secure password. Remember this password.
4.  Navigate to **Network Access** and click **Add IP Address**. Select **Allow Access from Anywhere** (0.0.0.0/0) and confirm.
5.  Go to **Database**, click **Connect** on your cluster, select **Compass**, and copy the connection string. You will need this for the backend setup.

#### **Stripe Setup**
1.  Create an account on [Stripe](https://stripe.com).
2.  Navigate to the developer dashboard and find your **Secret Key**.

### **3. Project Installation**
The project is divided into three parts: `backend`, `frontend`, and `admin`. They must be set up in this order.

#### **⚙️ Backend Setup**
The backend connects to the database and handles all the core logic.

1.  Navigate into the `backend` folder in your terminal:
    ```bash
    cd backend
    ```
2.  Install the required npm packages:
    ```bash
    npm install
    ```
3.  **Configure Database Connection**:
    *   Open the `config/db.js` file.
    *   Paste your MongoDB connection string into the `mongoose.connect()` method.
    *   **Important**: Replace `` in the connection string with the actual password you created for your database user.
4.  **Configure Stripe API Key**:
    *   Open the `.env` file in the `backend` folder.
    *   Paste your Stripe Secret Key into the `STRIPE_SECRET_KEY` variable.
5.  Start the backend server:
    ```bash
    npm run server
    ```
    If successful, you will see "DB connected" and "Server started" messages. You can verify it's working by opening `http://localhost:4000` in your browser.

#### **🖥️ Frontend Setup**
This is the main customer-facing website.

1.  Open a **new terminal** and navigate into the `frontend` folder:
    ```bash
    cd frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend application:
    ```bash
    npm run dev
    ```
    The application will now be running on its local URL (e.g., `http://localhost:5173`).

#### **👑 Admin Panel Setup**
This is the dashboard for managing the application.

1.  Open a **third terminal** and navigate into the `admin` folder:
    ```bash
    cd admin
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the admin panel:
    ```bash
    npm run dev
    ```
    The admin dashboard will be available on its own local URL (e.g., `http://localhost:5174`).

## **🔧 Usage and Customization**

### **Adding Food Items**
Your website will be empty initially. You must add products via the admin panel.
1.  Open the **Admin Panel** in your browser.
2.  Navigate to the **Add** page.
3.  Fill in the details for a food item and upload an image. Sample images can be found in `frontend/src/assets`.
4.  Click **Add**. The new item will now appear on the main website.

### **Customizing Currency and Delivery Fees**
You need to update the currency and charges in three different places to ensure consistency across the application.
*   **For Stripe Payments (Backend)**: Open `backend/controllers/orderController.js`. Update the `currency` (e.g., 'usd') and `delivery_charge` to match your Stripe account's settings.
*   **For Frontend Display**: Open `frontend/src/context/StoreContext.jsx`. Update the currency symbol and delivery charge for the user view.
*   **For Admin Display**: Open `admin/src/assets/assets.js`. Update the currency symbol for the admin panel.
