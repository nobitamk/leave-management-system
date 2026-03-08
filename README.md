# Leave Management System

## Overview
This project is a simple Leave Management System where employees can apply for leave and employers can review, approve, or reject leave requests.

The application demonstrates a full-stack system with authentication, role-based access control, and REST API integration.

---

## Tech Stack

Frontend  
- Vue.js  
- Tailwind CSS  
- Axios  

Backend  
- Node.js  
- Express.js  
- JWT Authentication  
- bcrypt for password hashing  

Database  
- MongoDB Atlas  

Deployment  
- Backend: Render  
- Frontend: Vercel  

---

## Live Application

Frontend  
https://leave-management-system-k1fa.vercel.app/

Backend API
https://leave-management-system-9rbd.onrender.com

---

## Features

### Employee
- Signup and login
- Apply for leave
- View leave request status (Pending / Approved / Rejected)

### Employer
- Login to employer dashboard
- View all employee leave requests
- Approve or reject leave requests

---

## Authentication & Security

- JWT based authentication
- Password hashing using bcrypt
- Role-based access control between Employee and Employer users
- Basic form input validation

---

## Employer Test Credentials

Email  
admin@test.com  

Password  
123456  

This account can be used to review, approve, or reject leave requests.

---

## API Endpoints

### Authentication

POST /api/auth/signup  
Register a new employee

POST /api/auth/login  
Login and receive JWT token

---

### Leave Management

POST /api/leave/apply  
Apply for leave (Employee)

GET /api/leave/my  
View employee leave requests

GET /api/leave/all  
View all leave requests (Employer)

PUT /api/leave/approve/:id  
Approve leave request (Employer)

PUT /api/leave/reject/:id  
Reject leave request (Employer)

---

## Local Setup

Backend

cd backend  
npm install  
npm start  

Frontend

cd Frontend/frontend  
npm install  
npm run dev  

---

## Future Improvements

- Email OTP verification during signup  
- Email notifications for leave approval or rejection  
- Password reset functionality  
- Leave balance tracking system
