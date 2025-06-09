# My Drive

A modern Vue.js application with authentication features and a beautiful Material Design interface using Vuetify.

## 🌐 Live Demo
The application is deployed and accessible at: [My Drive](https://my-drive11.netlify.app/login)

## Features

- **User Authentication**
  - Login with email and password
  - User registration with email validation
  - Secure logout with confirmation
  - Protected routes
  - Persistent authentication state

- **Modern UI/UX**
  - Material Design with Vuetify components
  - Responsive navigation drawer
  - User avatar display
  - Clean and intuitive interface
  - Smooth transitions and animations

- **State Management**
  - Vuex store for user management
  - Persistent authentication tokens
  - Centralized state handling

## Technology Stack

- Vue.js
- Vuetify (Material Design Framework)
- Vuex (State Management)
- Vue Router
- Dexie (Built with IndexedDB for reliable local data persist)

## Project Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run serve
```

3. Build for production:
```bash
npm run build
```

4. Lint and fix files:
```bash
npm run lint
```

## Authentication Flow

1. Users can access the login page at `/login`
2. New users can register at `/signup`
3. After successful authentication, users are redirected to `/home`
4. Protected routes require authentication
5. Logout is available through the navigation bar with confirmation


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
