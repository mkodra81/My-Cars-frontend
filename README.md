# My Cars Frontend

An Angular web application for managing vehicle information with role-based access control.

## What is this?

This frontend provides a complete car management interface where:

- **Clients** can register and manage their personal vehicle information (brand, model, year, color, license plate, etc.)
- **Admins** have full control to manage all users and their vehicles through a comprehensive dashboard

The application uses JWT (JSON Web Token) authentication for secure access and implements role-based navigation to ensure users only see features they're authorized to access.

## Key Features

### For Vehicle Owners (Clients)
- Register and authenticate securely
- Add and manage their own vehicles
- Track vehicle details including brand, model, year, color, and license information
- View vehicle information in an intuitive dashboard
- Full CRUD operations on their own cars only
- Update personal profile information

### For Administrators
- Full user management dashboard (create, view, update, delete users)
- Manage vehicles for any user
- View all clients and their associated vehicles
- Comprehensive oversight dashboard with statistics
- System-wide vehicle management

### Technical Features
- **JWT Authentication**: Secure token-based authentication with automatic token handling
- **Role-Based Access Control**: Client and Admin roles with appropriate UI restrictions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern Angular**: Built with Angular 20.3 standalone components
- **Route Guards**: Protected routes ensuring proper authentication and authorization
- **HTTP Interceptors**: Automatic JWT token injection and error handling
- **Real-time Validation**: Form validation with user-friendly error messages

## Use Cases

This frontend is perfect for:
- Personal vehicle tracking applications
- Car dealership management systems
- Fleet management solutions
- Automotive service centers managing customer vehicles
- Any application requiring multi-user vehicle data management

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:4200`

**Note**: Backend API must be running on `http://localhost:8080`

## Technology Stack

- **Framework**: Angular 20.3 with Standalone Components
- **Language**: TypeScript
- **Authentication**: JSON Web Tokens (JWT) via @auth0/angular-jwt
- **HTTP Client**: Angular HttpClient with interceptors
- **Node.js**: 18+

## Project Structure

```
src/app/
├── components/           # Feature components
│   ├── admin.dashboard/ # Admin overview dashboard
│   ├── car-management/  # Car CRUD operations
│   ├── dashboard/       # Client dashboard
│   ├── profile/         # User profile management
│   ├── sidebar/         # Navigation sidebar
│   └── users/           # User management (admin)
├── pages/               # Page layouts
│   ├── layout/          # Main application layout
│   ├── login/           # Login page
│   └── register/        # Registration page
├── services/            # API services
│   ├── auth.service.ts  # Authentication & user management
│   ├── car.service.ts   # Vehicle operations
│   └── admin.service.ts # Admin operations
├── guards/              # Route protection
│   └── auth.guard.ts    # Authentication guard
├── interceptors/        # HTTP interceptors
│   └── auth.interceptor # JWT token injection
└── models/              # TypeScript interfaces
    ├── user.ts          # User and UserProfile models
    ├── cars.ts          # Car and CarDetails models
    ├── login.ts         # Login request/response
    └── token.ts         # JWT token structure
```

## Available Scripts

- `npm start` - Start development server (http://localhost:4200)
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run watch` - Build in watch mode

## Features Overview

### Authentication Flow
- User registration with role assignment
- Secure login with JWT tokens
- Token storage and automatic refresh
- Auto-logout on token expiration
- Protected routes with authentication guard

### Client Dashboard
- View personal vehicle collection
- Add new vehicles with complete details
- Edit existing vehicle information
- Delete vehicles with confirmation
- Profile management with password change

### Admin Dashboard
- System statistics and overview
- Complete user management interface
- Vehicle management across all users
- User creation and role assignment
- Comprehensive data tables with search and filters

## License

MIT License

