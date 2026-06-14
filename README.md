# 🏥 Hospital TechCare

A full-stack **Hospital Management System** designed to manage healthcare operations digitally.  
The project provides backend APIs for handling patients, doctors, appointments, and hospital-related data.

## 📌 Project Overview

**Hospital TechCare** is a backend-based application developed to simplify hospital management processes.

The system provides:
- Patient management
- Doctor management
- Appointment handling
- Secure API communication
- Database management

## ✨ Features

- 👨‍⚕️ Doctor management
- 🧑‍🤝‍🧑 Patient records management
- 📅 Appointment scheduling
- 🔐 Authentication & authorization
- 🛡️ Middleware security
- 🗄️ SQL database integration
- 🌐 REST API architecture

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js

### Database
- MySQL / SQL Database

### Tools
- Postman
- Git & GitHub

## 📂 Project Structure

```
Hospital-TechCare/
│
├── config/              # Configuration files
│
├── controllers/         # Business logic
│
├── database/            # Database connection
│
├── middleware/          # Authentication middleware
│
├── models/              # Database models
│
├── routes/              # API routes
│
├── SQL/                 # SQL queries / database files
│
├── Screenshots/         # Project screenshots
│
├── server.js            # Main server file
│
├── package.json         # Dependencies
│
└── README.md
```

## 🚀 Installation & Setup

### Clone Repository

```bash
git clone https://github.com/your-username/Hospital-TechCare.git
```

### Navigate to Project Folder

```bash
cd Hospital-TechCare
```

### Install Dependencies

```bash
npm install
```

### Configure Database

Create database in MySQL:

```sql
CREATE DATABASE hospital_techcare;
```

Import SQL files from:

```
SQL/
```

Update database credentials in config file.

Example:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hospital_techcare
```

## ▶️ Run Application

Start server:

```bash
node server.js
```

or

```bash
npm start
```

Server runs on:

```
http://localhost:5000
```

## 🔗 API Modules

### Patients

```
GET    /api/patients
POST   /api/patients
PUT    /api/patients/:id
DELETE /api/patients/:id
```

### Doctors

```
GET    /api/doctors
POST   /api/doctors
```

### Appointments

```
GET    /api/appointments
POST   /api/appointments
```

## 📸 Screenshots

Project screenshots are available in:

```
Screenshots/
```

## 🔮 Future Enhancements

- Online doctor consultation
- Payment integration
- Admin dashboard
- Email/SMS appointment alerts
- Cloud deployment
- Mobile application

## 👨‍💻 Developer

**Prathamesh V Shenoy**

## ⭐ Project Status

Completed Full Stack Hospital Management System.

