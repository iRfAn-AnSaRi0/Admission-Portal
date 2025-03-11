# Admission Portal API

## Project Description
The Admission Portal API is a backend system designed to manage student registrations and admin approvals. It provides secure endpoints for handling student data, authentication, and admin actions.

## Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB**
- **JWT Authentication**
- **Nodemon**

---

## Setup Instructions

1. **Clone the Repository:**
```bash
git clone <repository-url>
cd <project-folder>
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Create a `.env` file in the root folder and add the following:**
```
PORT = 8000

CORS_ORIGIN = *

DB_URI = *


REFRESH_TOKEN_SECRET = *
REFRESH_TOKEN_EXPIRY = *
ACCESS_TOKEN_SECRET = *
ACCESS_TOKEN_EXPIRY = *


CLOUDINARY_CLOUD_NAME = *
CLOUDINARY_CLOUD_APIKEY = *
CLOUDINARY_CLOUD_APISECRET = *
```

4. **Start the Server:**
```nodemon
npm start
```

---

## API Endpoints

### **User Routes**
- **`POST /user/signup`** → Register a new user
- **`POST /user/login`** → Login with email and password
- **`POST /user/logout`** → Logout the current session
- **`GET /user/profile`** → Get current user details
- **`POST /user/refreshtoken`** → Re-fresh the accesstoken when it expire

### **Student Routes**
- **`POST /apply`** → Register or Apply in course
- **`PUT update/application/:id`** → Update application

### **Admin Routes**
- **`POST /user/signup`** → Admin Register
- **`POST /user/login`** → Admin Login with email and password
- **`POST /user/logout`** → Admin Logout the current session
- **`PUT /:id/appliaction`** → Update application status
- **`GET /applications`** → Get all application
---

## Folder Structure
```
/src
  ├── config
  ├── controllers
  ├── models
  ├── routes
  ├── utils
  ├── .env
  ├── app.js
  ├── index.js
```

---

## Notes
- Ensure MongoDB is running before starting the server.
- Use Postman or a similar tool to test API endpoints.
- For admin authentication, static credentials are used (e.g., `admin` / `password`).

---

## License
This project is licensed under the [MIT License](LICENSE).
