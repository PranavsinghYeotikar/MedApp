medapp/                   # Root project folder
│
├─ backend/               # Node.js + Express API
│   ├─ config/            # Config files (DB, env, JWT secret)
│   │   └─ db.js
│   │   └─ jwt.js
│   │
│   ├─ controllers/       # Route controllers
│   │   ├─ adminController.js
│   │   ├─ patientController.js
│   │   └─ pharmacyController.js
│   │
│   ├─ middleware/        # Auth, role checks, error handling
│   │   ├─ authMiddleware.js
│   │   └─ errorMiddleware.js
│   │
│   ├─ models/            # Mongoose models
│   │   ├─ Admin.js
│   │   ├─ Patient.js
│   │   └─ Pharmacy.js
│   │
│   ├─ routes/            # Express routes
│   │   ├─ adminRoutes.js
│   │   ├─ patientRoutes.js
│   │   └─ pharmacyRoutes.js
│   │
│   ├─ utils/             # Helper functions (email, notifications)
│   │   ├─ email.js
│   │   └─ notification.js
│   │
│   ├─ .env               # Environment variables
│   └─ server.js          # Express entry point
│
├─ frontend/              # React + Tailwind / Chakra UI
│   ├─ public/            # Static assets
│   ├─ src/
│   │   ├─ components/    # Reusable components
│   │   │   ├─ Patient/
│   │   │   │   ├─ Dashboard.js
│   │   │   │   ├─ PrescriptionForm.js
│   │   │   │   └─ Reminder.js
│   │   │   ├─ Pharmacy/
│   │   │   │   ├─ Dashboard.js
│   │   │   │   ├─ Inventory.js
│   │   │   │   └─ ExpiryAlerts.js
│   │   │   └─ Admin/
│   │   │       ├─ Dashboard.js
│   │   │       └─ VerifyPharmacies.js
│   │   │
│   │   ├─ context/       # React context for auth, global state
│   │   ├─ pages/
│   │   │   ├─ Login.js
│   │   │   ├─ Register.js
│   │   │   └─ NotFound.js
│   │   ├─ services/      # API calls (axios/fetch)
│   │   │   ├─ adminService.js
│   │   │   ├─ patientService.js
│   │   │   └─ pharmacyService.js
│   │   ├─ App.js
│   │   └─ index.js
│   │
│   ├─ tailwind.config.js
│   └─ package.json
│
├─ package.json           # Root dependencies & scripts
└─ README.md
