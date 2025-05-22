# Inventec Website

## Software Requirements

- **Next.js**: 13.1.6
- **Tailwind CSS**
- **Mongoose**
- **MongoDB**
- **NextAuth**
- **Bcrypt**

---

## Authentication APIs

- `POST /api/auth/login` — Login with username and password   
- `POST /api/register` — Register new user with username and password  

---

## Product Management APIs

- `POST /api/product` — Create a new product  
- `PUT /api/product/:id` — Edit existing product  
- `DELETE /api/product/:id` — Delete a product  
- `GET /api/product` — Render/fetch all products  

---

## MongoDB Schema

### User

| Field    | Type   | Description              |
|----------|--------|--------------------------|
| Email    | String | Unique user email        |
| Password | String | Bcrypt-hashed password   |
| Role     | String | `User` or `Admin`        |

### Product

| Field           | Type     | Description                              |
|------------------|----------|------------------------------------------|
| Name             | String   | Product name                             |
| ImageUrl         | String   | URL to product image                     |
| Description      | String   | Short description                        |
| Chip             | String   | Chip/Processor used                      |
| Support OS       | [String] | List of supported operating systems      |
| Tops             | Number   | Performance metric (TOPS)                |
| Category         | String   | Product category                         |
| Platform         | String   | Platform name (e.g., Qualcomm, Nvidia)   |
| DownloadUrl      | String   | Link to downloadable file                |
| DetailPagePath   | String   | Internal route to product detail page    |

---

## 🏗️ Application Architecture
User → RateLimiter → API Layer → MongoDB

---

## 🚀 Notes

- Role-based access control is implemented (Admin vs. User)
- Passwords are securely hashed using `bcrypt`
- NextAuth handles authentication and session management
