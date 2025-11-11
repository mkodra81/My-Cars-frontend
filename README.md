# My Cars - Car Management Application

A full-stack Angular application for managing your car collection with user authentication and CRUD operations.

## Features

- 🔐 **User Authentication**: Login and registration with JWT tokens
- 🚗 **Car Management**: Add, view, edit, and delete cars
- 👤 **User Profile**: Manage profile information and change password
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 🔒 **Protected Routes**: Secure pages with authentication guards

## Tech Stack

### Frontend
- **Angular 20.3**: Modern Angular with standalone components
- **TypeScript**: Type-safe development
- **RxJS**: Reactive programming
- **ngx-toastr**: Toast notifications
- **@auth0/angular-jwt**: JWT handling

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Backend API running on `http://localhost:8080`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure the API URL:
   - Edit `src/app/services/auth.service.ts` and `src/app/services/car.service.ts`
   - Update the `apiUrl` to match your backend server

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── components/          # UI Components
│   │   ├── home/           # Landing page
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   ├── navigation/     # Navigation bar
│   │   ├── user-profile/   # User profile page
│   │   ├── car-list/       # List of cars
│   │   ├── car-detail/     # Car details page
│   │   └── car-form/       # Add/Edit car form
│   ├── services/           # Business logic
│   │   ├── auth.service.ts # Authentication service
│   │   └── car.service.ts  # Car management service
│   ├── guards/             # Route guards
│   │   └── auth.guard.ts   # Authentication guard
│   ├── interceptors/       # HTTP interceptors
│   │   └── auth.interceptor-interceptor.ts
│   ├── models/             # TypeScript interfaces
│   └── app.routes.ts       # Application routes
└── styles.css              # Global styles
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run watch` - Build in watch mode

## Features Overview

### Authentication
- User registration with validation
- Secure login with JWT tokens
- Token stored in localStorage
- Auto-logout on token expiration
- Protected routes with auth guard

### Car Management
- View all your cars in a grid layout
- Add new cars with brand, model, year, color, and image
- Edit existing car information
- Delete cars with confirmation
- View detailed car information

### User Profile
- Update profile information (name, email)
- Change password
- View username and account details

## API Endpoints Expected

The frontend expects the following backend API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-password` - Change password
- `PUT /api/auth/users/:id` - Update user profile

### Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get car by ID
- `GET /api/cars/user/:userId` - Get user's cars
- `POST /api/cars` - Create new car
- `PUT /api/cars/:id` - Update car
- `DELETE /api/cars/:id` - Delete car

## Design Features

- **Gradient Theme**: Purple/blue gradient throughout the app
- **Card-based UI**: Modern card design for content
- **Smooth Animations**: Hover effects and transitions
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Toast Notifications**: User feedback for all actions
- **Loading States**: Spinners and loading indicators

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For any questions or issues, please open an issue on the repository.

