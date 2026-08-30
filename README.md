# ResolveHub — AI Support Ticket System

ResolveHub is a full-stack AI-powered customer support ticket management system built for a Hackathon project.

It allows customers to create and track support tickets while administrators can review, approve, manage, prioritize, and resolve customer issues.

The system also uses AI to analyze customer complaints and suggest a **category, priority, and short summary** for human review.

---

## 🚀 Features

### 👤 Customer

* Customer registration and login
* JWT-based authentication
* Create support tickets
* Add ticket title and description
* Select ticket category
* Select priority/urgency
* Add order ID
* Add contact number
* Select preferred contact method
* View own tickets
* View ticket status
* Cancel tickets
* View AI-generated ticket suggestions
* Track ticket progress
* Responsive dashboard

### 🛡️ Admin

* Admin login
* Role-based authentication
* Protected admin dashboard
* View all customer tickets
* Review new tickets
* Approve/manage tickets
* Update ticket status
* Change ticket priority
* Change ticket category
* Add resolution note
* Resolve tickets
* Delete tickets
* View ticket statistics
* High / Medium / Low priority statistics
* New / In Progress / Resolved / Cancelled statistics

### 🤖 AI Ticket Triage

ResolveHub analyzes customer complaints using AI.

Example:

> "I was charged twice for the same order and need one payment refunded."

AI suggestion:

```text
Category: Billing
Priority: High
Summary: Possible duplicate payment reported by customer.
```

The AI result is displayed for human review before being finalized.

If the AI service fails, the ticket can still be handled manually.

---

## 🔐 Authentication

The application uses:

* JWT authentication
* Protected routes
* Role-based authorization
* Customer role
* Admin role
* Password hashing with bcryptjs
* Environment variables for JWT secrets

### Roles

```text
Customer
Admin
```

Customers can only access their own tickets.

Admins can access and manage all tickets.

---

# 🛠️ Technology Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* React Hot Toast
* React Icons / Lucide React

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* dotenv
* CORS

## AI

* AI API integration
* AI ticket classification
* AI priority suggestion
* AI summary generation

---

# 📁 Project Structure

```text
ResolveHub/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── ticketController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Ticket.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── ticketRoutes.js
│   │
│   ├── services/
│   │   └── aiService.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

Clone the project:

```bash
git clone <your-github-repository-url>
```

Go to the project:

```bash
cd ResolveHub
```

---

# 📦 Backend Setup

Open the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

AI_API_KEY=your_ai_api_key
```

Start the backend:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

---

# 🎨 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start Vite:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

# 🔑 Demo Admin Login

Use the following account for the Hackathon demonstration:

```text
Email: admin@resolvehub.com
Password: Admin@123
Role: Admin
```

> Make sure this admin account exists in your MongoDB database before the demonstration.

---

# 👤 Customer Login

Customers can create their own account from:

```text
/register
```

After registration, the customer is redirected to the login page.

Customer login:

```text
/login
```

Select:

```text
Customer
```

---

# 🔄 Ticket Workflow

The ticket follows this workflow:

```text
New
  ↓
Assigned
  ↓
In Progress
  ↓
Resolved
```

A ticket can also be:

```text
Cancelled
```

Customers can cancel their own tickets when allowed.

---

# 🎫 Creating a Ticket

A customer provides information such as:

```text
Title
Description
Category
Priority/Urgency
Order ID
Contact Number
Contact Method
```

The backend validates the ticket and stores it in MongoDB.

Each ticket receives a unique ticket number such as:

```text
RH-482913
```

---

# 🤖 AI Processing

When a ticket is created, the backend sends the complaint to the AI service.

The AI returns:

```json
{
  "category": "Billing",
  "priority": "High",
  "summary": "Possible duplicate payment reported by customer."
}
```

The result is stored with the ticket for review.

The API key remains on the backend and is never exposed in the frontend.

---

# 📊 Admin Dashboard

The admin dashboard provides statistics such as:

```text
Total Tickets
New Tickets
In Progress
Resolved
Cancelled
High Priority
Medium Priority
Low Priority
```

These statistics are calculated from actual MongoDB ticket data.

---

# 🔒 Business Rules

### Authentication

Only authenticated users can access protected areas.

### Customer Access

Customers can only view their own tickets.

### Admin Access

Admins can view and manage all tickets.

### Priority

Allowed priority levels:

```text
Low
Medium
High
```

### Resolved Tickets

A resolved ticket cannot normally be changed unless reopened.

### Resolution

A ticket cannot be marked as resolved without a resolution note.

### AI

AI suggestions are validated before being stored.

### Security

API keys and JWT secrets are stored in environment variables and are not exposed in frontend code.

---

# 📡 API Structure

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

## Customer Tickets

```text
POST /api/tickets
GET /api/tickets/my
GET /api/tickets/my/:id
PUT /api/tickets/:id/cancel
```

## Admin Tickets

```text
GET /api/tickets
PUT /api/tickets/:id
DELETE /api/tickets/:id
GET /api/tickets/stats
```

All protected endpoints require:

```text
Authorization: Bearer <JWT_TOKEN>
```

---

# 🧪 Hackathon Demonstration Flow

The project can be demonstrated using the following workflow:

### 1. Customer Registration

Create a new customer account.

### 2. Customer Login

Login using the Customer role.

### 3. Create Ticket

Submit a customer complaint.

Example:

```text
Title:
Duplicate Payment

Description:
I was charged twice for the same order and need one payment refunded.
```

### 4. AI Analysis

The AI suggests:

```text
Category: Billing
Priority: High
Summary: Possible duplicate payment reported by customer.
```

### 5. Admin Login

Logout and login using the Admin role.

```text
Email:
admins@resolvehub.com

Password:
Admin@123
```

### 6. Review Ticket

The admin reviews the customer ticket and AI suggestions.

### 7. Update Ticket

Admin can change:

```text
Category
Priority
Status
Resolution Note
```

### 8. Resolve Ticket

Admin adds a resolution note and changes status to:

```text
Resolved
```

### 9. Customer Checks Status

Customer can see the latest ticket status from their dashboard.

---

# 🌐 Environment Variables

Never commit `.env` files to GitHub.

Example:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/resolvehub

JWT_SECRET=your_secret_key

AI_API_KEY=your_private_ai_key
```

Add `.env` to `.gitignore`:

```text
.env
node_modules
dist
```

---

# 🛡️ Security

ResolveHub follows basic security practices:

* Password hashing
* JWT authentication
* Protected API routes
* Role-based authorization
* MongoDB validation
* Environment variables
* Backend-only AI API key
* Customer ticket ownership validation

---

# 📱 Responsive Design

The interface is designed for:

* Desktop
* Laptop
* Tablet
* Mobile

Both customer and admin dashboards use responsive layouts.

---

# 🎯 Project Goal

The goal of ResolveHub is to demonstrate how a modern support platform can combine:

```text
Authentication
       +
Ticket Management
       +
AI Triage
       +
Role-Based Access
       +
Dashboard Analytics
       +
Real-Time Updates
       +
MongoDB Persistence
```

into one reliable full-stack MVP.

---

# 👩‍💻 Hackathon Project

**Project:** ResolveHub
**Type:** Full-Stack AI Support Ticket System
**Purpose:** Hackathon MVP
**Frontend:** React + Vite + Tailwind CSS
**Backend:** Node.js + Express.js
**Database:** MongoDB
**Authentication:** JWT
**AI:** AI-powered Ticket Triage

---

## ⭐ Future Improvements

Possible future enhancements include:

* AI-generated resolution summaries
* Similar/duplicate ticket detection
* Automatic ticket assignment
* Real-time typing indicator
* Email notifications
* Redis caching
* Background job processing
* Docker deployment
* CI/CD with GitHub Actions
* GraphQL API
* Advanced analytics

---

## 📄 License

This project was developed as a Hackathon project for educational and demonstration purposes.

```
```
