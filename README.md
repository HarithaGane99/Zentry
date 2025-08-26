Zentry - User Management System
Zentry is a full-stack MERN (MongoDB, Express, React, Node.js) application designed as a complete user management system. It features a secure authentication system using JSON Web Tokens (JWT) and role-based access control, providing distinct functionalities for regular users and administrators.

Features
Public Features
User Registration: New users can create an account.

User Login: Registered users can log in to access protected routes.

Authenticated User Features
View Profile: Users can view their own profile details.

Update Profile: Users can edit and update their personal information.
--   Protected Routes: Access to the profile page is restricted to logged-in users.

Admin Features
Admin Dashboard: Admins have access to a dashboard to manage all users.

View All Users: Admins can see a list of every user in the system.

Create Users: Admins can create new user accounts directly from the dashboard.

Update Any User: Admins have the authority to modify the details of any user.

Delete Users: Admins can remove any user from the system.

Role-Based Access: All administrative routes and functionalities are protected and accessible only to users with the 'admin' role.

Tech Stack
Backend
Node.js: JavaScript runtime environment

Express: Web framework for Node.js

MongoDB: NoSQL database for storing user data

Mongoose: Object Data Modeling (ODM) library for MongoDB

JSON Web Token (JWT): For secure user authentication and authorization

bcryptjs: For hashing user passwords

CORS: For enabling cross-origin resource sharing

dotenv: For managing environment variables

Frontend
React: JavaScript library for building user interfaces

React Router: For client-side routing

Axios: For making HTTP requests to the backend API

React Context API: For global state management (user authentication)

Vite: For a fast frontend development environment

Project Setup
To get this project running on your local machine, follow these steps.

Prerequisites
Node.js and npm installed

MongoDB installed and running locally, or a connection string to a cloud instance (like MongoDB Atlas)

Backend Setup
Navigate to the backend directory:

cd backend

Install the required dependencies:

npm install

Create a .env file in the backend directory and add the following variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_for_jwt

Start the backend server:

npm start

The server will be running on http://localhost:5000.

Frontend Setup
Open a new terminal and navigate to the frontend directory:

cd frontend

Install the required dependencies:

npm install

Start the frontend development server:

npm run dev

The application will be accessible at http://localhost:5173 (or another port if 5173 is in use).

Creating Your First Admin User
By default, all new registrations create a user with the user role. To create an administrator:

Register a new account using the registration form in the application.

Connect to your MongoDB database using a tool like MongoDB Compass or the mongo shell.

Navigate to the usermodels collection within your database.

Find the user you just created.

Manually edit the role field for that user from "user" to "admin".

Save the changes. The next time this user logs in, they will have administrative privileges.
