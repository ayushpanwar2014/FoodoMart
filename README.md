
Screenshots

<img width="1360" height="900" alt="Foodomart" src="https://github.com/user-attachments/assets/2ae14df9-19f2-4b7a-8a93-69b1fbf1a880" />


# Blog Website – Online Food Delivery Platform

Full-Stack Developer | Feb – Jun 2024
GitHub Repository: [https://github.com/ayushpanwar2014/FoodoMart](https://github.com/ayushpanwar2014/FoodoMart) | Remote  

---

<article>
  <h2>Tech Skills 🛠️</h2>

  <!-- Skillicons for supported skills -->
  <img src="https://skillicons.dev/icons?i=html,css,js,react,nodejs,expressjs,mongodb,git,github&perline=5" alt="Tech Stack" />
  
![REST APIs](https://img.shields.io/badge/REST%20APIs-6C63FF?style=for-the-badge)
![CI/CD](https://img.shields.io/badge/CI%2FCD-E53E3E?style=for-the-badge)
![Agile](https://img.shields.io/badge/Agile-F6AD55?style=for-the-badge)
![Microservices](https://img.shields.io/badge/Microservices-805AD5?style=for-the-badge)
![DBMS](https://img.shields.io/badge/DBMS-D69E2E?style=for-the-badge)
![DSA](https://img.shields.io/badge/DataStructures--Algorithms-3182CE?style=for-the-badge)
</article>

<article>


## Overview
A scalable food delivery application built with the MERN stack (React, Node.js, Express.js, MongoDB), designed for seamless order management and real-time tracking.

## Key Features:





Real-Time Order Tracking: Enables users to monitor order status live, enhancing user experience.

Role-Based Access: Supports Users, Restaurants, and Admins for streamlined operations.

Secure Payments: Integrated Stripe for reliable and secure payment processing.

Performance Optimization: Utilized Redis caching to reduce API response times and CI/CD pipelines for efficient updates.

Media Management: Leveraged Cloudinary for optimized image handling.

Scalable Deployment: Employed Docker to ensure consistent and scalable deployments.

## Achievements:

Improved order processing efficiency by 40% through optimized REST APIs and backend logic.

Reduced server load with Redis caching, enabling high-traffic handling.

Enhanced scalability with Docker, supporting seamless updates and deployments.

GitHub Repository: https://github.com/ayushpanwar2014/FoodoMart
---

## Features
- Role-based access control (Admin / Doctor / Patient)  
- Real-time appointment bookings  
- Razorpay & COD payment integration  
- Secure authentication with JWT, rotating refresh tokens, HTTP-only cookies  
- Redis caching for optimized performance  
- Media management with Cloudinary  
- CRUD operations for users, appointments, and doctors  
- RESTful API endpoints for frontend consumption  

---

## Environment Variables
The backend requires the following environment variables in a `.env` file:


```bash
PORT =
MONGODB_URL =
CLOUDINARY_NAME =
CLOUDINARY_API_KEY =
CLOUDINARY_API_SECRET =
ADMIN_EMAIL =
ADMIN_PASSSWORD =
JWT_SECRET =
RAZORPAY_KEYID =
RAZORPAY_KEY_SECRET = 
CURRENCY =
FRONTEND_URL = 
ADMIN_URL = 
REDIS_PASSWORD = 
REDIS_HOST = 
REDIS_PORT = 

````
The Frontend requires the following environment variables in a `.env` file:

```bash

VITE_BACKEND_URL = 
VITE_RAZORPAY_KEYID = 
````

---
The Admin requires the following environment variables in a `.env` file:

```bash

VITE_BACKEND_URL = 
````

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ayushpanwar2014/Prescripto.git
````

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Run the backend server:

```bash
npm start
```

4. Set up frontend in `/frontend` and `/admin` folders (React apps) and run with `npm start`.

---

## Backend Dependencies

* argon2
* cloudinary
* cookie-parser
* cors
* dotenv
* express
* express-rate-limit
* helmet
* hpp
* jsonwebtoken
* mongoose
* morgan
* multer
* razorpay
* redis
* zod

---

## License

MIT License


