# MERN-Blog
Navigate dynamic pages with React Router Dom, and secure authentication with JWTs &amp; Google OAuth streamlined by Redux Toolkit for efficient state management. The admin dashboard offers comprehensive CRUD operations with MongoDB. Fully responsive with dark/light mode &amp; advanced search functionality for an intuitive user experience.

# Application Features 
- Full Stack MERN Blog Application using MongoDB, Express, React, Node.js
- Responsive Navbar with Tailwind CSS
- Node.js backend using Express Framework
- MongoDB connection to a Node.js backend
- Secured routing for Signup API in a Node.js backend with Express
- Middleware with functionality to handle custom errors in Express application
- Signup page frontend design using Flowbite React
- Backend Signup API connection established to React frontend
- Reusable React footer component 
- Signin route API with JWT
- Signin UI page with connection from backend API to frontend
- Redux Toolkit connection to React application
- Redux Persist connection to Reach application
- Google OAuth Login established
- Goodle OAuth Signin available
- Dynamic header component that fetches backend data
- User Dashboard with complete functionality
- Dynamic user profile page 
- Upload image using Goole Firebase in React 
- Update user API with connection to existing React frontend
- Delete user implementation functionality with Node.js and React
- Complete user update functionality using Node.js with Express
- Signout functionality 
- Admin user only features 
- Custom post page with complete functionality
- Create a post backend API using Express implementation
- Sidebar option to view all posts
- Get all posts API endpoint with frontend integration
- Show more pagination implementation feature
- Edit existing posts feature
- Display all users API with complete integration using React frontend
- Dynamic blog post page with complete integrations
- Comment feature inside a dynamic post + connection with MongoDB
- Show all comments feature to social application
- Add, like, delete, edit functionality to a social post comment
- All comments status dashboard page for Admins only
- Search filters with search page UI

## Backend Configuration

1. **Environment Files**: Navigate to the `server` folder and create one file: `.env`. Add the following contents:

    ```plaintext
    MONGO=

    JWT_SECRET=
    ```

## Frontend Configuration

1. **Environment Files**: Navigate to the `client` folder and create a file: `.env`:

    ```plaintext
    VITE_FIREBASE_API_KEY=
    ```
2. Navigate to the `client` folder and create a file: `firebase.js`:

    ```plaintext
    Import the functions you need from the SDKs you need -
import { initializeApp } from "firebase/app";

    Add SDKs for Firebase products that you want to use using [Firebase](https://firebase.google.com/docs/web/setup#available-libraries)

    Add your web app's Firebase configuration -
    For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: ,
  authDomain: " ",
  projectId: " ",
  storageBucket: " ",
  messagingSenderId: " ",
  appId: " ",
  measurementId: " "
};

    Initialize Firebase and export to use in other parts of our application - 
export const app = initializeApp(firebaseConfig);
    ```

