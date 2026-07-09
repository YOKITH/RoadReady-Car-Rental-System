# 🚗 RoadReady - Car Rental System

A full-stack Car Rental Management System developed using **ASP.NET Core Web API**, **React.js**, and **SQL Server**. The system enables customers to browse and reserve vehicles, while administrators and rental agents manage cars, reservations, check-ins/check-outs, maintenance, payments, and reviews.

---

## 📌 Features

### Customer
- User Registration & Login (JWT Authentication)
- Browse Available Cars
- View Car Details
- Reserve Cars
- Secure Payment
- Reservation History
- Submit Reviews

### Admin
- Dashboard
- Manage Cars (CRUD)
- Manage Reservations
- Manage Users
- Manage Payments
- View Reports

### Rental Agent
- Dashboard
- Vehicle Check-In
- Vehicle Check-Out
- Maintenance Management
- Today's Pickups & Returns

---

# 🛠 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- AutoMapper
- JWT Authentication
- SQL Server

### Testing
- xUnit
- Moq

---

# 📂 Project Structure

```
RoadReady-Car-Rental-System
│
├── RoadReady.API          # ASP.NET Core Web API
├── RoadReady.UI           # React Frontend
└── Road_Ready_Tests       # Unit Tests
```

---

# ⚙️ Prerequisites

Before running the project, ensure the following are installed:

- .NET SDK 8.0
- Node.js (v18 or later)
- SQL Server
- SQL Server Management Studio (SSMS) (Optional)
- Visual Studio 2022 / VS Code
- Git

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/YOKITH/RoadReady-Car-Rental-System.git
```

```bash
cd RoadReady-Car-Rental-System
```

---

# Backend Setup

Navigate to the backend project.

```bash
cd RoadReady.API
```

Restore packages.

```bash
dotnet restore
```

Update the connection string inside

```
appsettings.json
```

Example:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=RoadReadyDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

Apply migrations.

```bash
dotnet ef database update
```

Run the API.

```bash
dotnet run
```

The API will be available at:

```
https://localhost:7021
```

Swagger:

```
https://localhost:7021/swagger
```

---

# Frontend Setup

Open another terminal.

Navigate to the frontend.

```bash
cd RoadReady.UI
```

Install dependencies.

```bash
npm install
```

Run the React application.

```bash
npm start
```

or

```bash
npm run dev
```

depending on the project configuration.

Frontend URL

```
http://localhost:3000
```

or

```
http://localhost:5173
```

---

# Running Unit Tests

Navigate to the test project.

```bash
cd Road_Ready_Tests
```

Run tests.

```bash
dotnet test
```

---

# API Documentation

After running the backend, open:

```
https://localhost:7021/swagger
```

---

# Authentication

The application uses **JWT Authentication**.

Login using a registered account to receive an access token.

The token must be included in all protected API requests.

---

# Screenshots

Screenshots will be added here.

---

# Docker

Docker support is currently under development.

Docker setup instructions will be added after Docker implementation is completed.

---

# Future Enhancements

- Docker Deployment
- Cloud Deployment
- Email Notifications
- Payment Gateway Integration
- Vehicle Tracking
- Analytics Dashboard

---

# Contributors

- **Suresh Krishna P**
- Additional contributors will be added.

---

# License

This project is developed for educational and learning purposes.
