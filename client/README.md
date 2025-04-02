# Profile Map Integration Application

A full-stack web application for managing profiles with location data and interactive map visualization.

## Features

- 🗺️ Interactive map with custom profile markers
- 👤 Profile management system
- 🔍 Location-based filtering
- 🌍 Continent-based grouping
- 📱 Responsive design
- 🖼️ Profile image upload
- 🎨 Modern UI/UX

## Tech Stack

### Frontend
- React.js 
- Leaflet Maps
- CSS3
- React Router DOM v6

### Backend
- Node.js
- Express.js
- MongoDB (Local)
- Multer

## Prerequisites

1. Install required software:
   - Node.js (v14+)
   - MongoDB Community Edition
   - VS Code

2. Start MongoDB service:
```bash
# Start MongoDB service on Windows
net start MongoDB
```

## Project Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Map-integration
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd client
npm install
```

## Configuration

1. Server configuration (server/.env):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/profilemap
NODE_ENV=development
```

2. Client configuration (client/.env):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

1. Start MongoDB:
```bash
# Verify MongoDB is running
mongosh
```

2. Start the server:
```bash
cd server
npm run dev
```

3. Start the client:
```bash
cd client
npm start
```

Access the application at: http://localhost:3000

## Project Structure


```
Map-integration/
├── client/                         # Frontend React application
│   ├── public/                    # Public assets
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── src/                       # Source files
│   │   ├── components/           # Reusable components
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── MapComponent.jsx
│   │   │   ├── ProfileCard.jsx
│   │   │   ├── ProfileDetails.jsx
│   │   │   ├── ProfileForm.jsx
│   │   │   ├── ProfileList.jsx
│   │   │   └── SearchBar.jsx
│   │   │
│   │   ├── context/             # Context providers
│   │   │   └── ProfileContext.jsx
│   │   │
│   │   ├── pages/              # Page components
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProfileDetailPage.jsx
│   │   │   └── ProfilesListPage.jsx
│   │   │
│   │   ├── services/          # API services
│   │   │   └── api.js
│   │   │
│   │   ├── styles/           # Stylesheets
│   │   │   └── App.css
│   │   │
│   │   ├── App.jsx          # Main App component
│   │   ├── index.jsx        # Entry point
│   │   └── index.css        # Global styles
│   │
│   ├                
│   ├── package.json         # Dependencies and scripts
│   └── README.md           # Frontend documentation
│
├── server/                 # Backend Node.js application
│   ├── config/            # Configuration files
│   │   └── db.js         # Database configuration
│   │
│   ├── controllers/      # Route controllers
│   │   └── profileController.js
│   │
│   ├── models/          # Database models
│   │   └── Profile.js
│   │
│   ├── routes/         # API routes
│   │   └── profileRoutes.js
│   │
│   ├── uploads/       # Profile image uploads directory
│   │   └── .gitkeep
│   │
│   ├── utils/        # Utility functions
│   │   └── errorHandler.js
│   │
│   ├── .env         # Environment variables
│   ├── .gitignore   # Git ignore file
│   ├── package.json # Dependencies and scripts
│   └── server.js    # Entry point
│
├── .gitignore      # Root git ignore
└── README.md      # Project documentation
```

## Key Directories and Files

### Client Side

- `/client/public/`: Static files and HTML template
- `/client/src/components/`: Reusable React components
- `/client/src/context/`: React Context providers
- `/client/src/pages/`: Page-level components
- `/client/src/services/`: API service functions
- `/client/src/styles/`: CSS stylesheets
- `/client/src/App.jsx`: Main application component
- `/client/src/index.jsx`: Application entry point

### Server Side

- `/server/config/`: Configuration files (DB, env)
- `/server/controllers/`: Request handlers
- `/server/models/`: Database models
- `/server/routes/`: API route definitions
- `/server/uploads/`: File upload directory
- `/server/utils/`: Helper functions
- `/server/server.js`: Server entry point

## Key Files Description

### Client

1. **Components**
   - `Header.jsx`: Navigation bar component
   - `MapComponent.jsx`: Leaflet map integration
   - `ProfileCard.jsx`: Profile display card
   - `ProfileForm.jsx`: Create/Edit profile form
   - `SearchBar.jsx`: Search functionality

2. **Context**
   - `ProfileContext.jsx`: Global state management

3. **Pages**
   - `HomePage.jsx`: Landing page with map
   - `AdminDashboard.jsx`: Profile management
   - `ProfileDetailPage.jsx`: Individual profile view

### Server

1. **Configuration**
   - `db.js`: MongoDB connection setup
   - `.env`: Environment variables

2. **API**
   - `profileController.js`: Profile CRUD operations
   - `profileRoutes.js`: Route definitions
   - `Profile.js`: MongoDB schema

## Dependencies

### Client
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "leaflet": "^1.9.4"
  }
}
```

### Server
```json
{
  "dependencies": {
    "express": "^5.1.0",
    "mongoose": "^8.13.1",
    "multer": "^1.4.5-lts.2",
    "cors": "^2.8.5"
  }
}
```
## API Endpoints

### Profiles
- `GET /api/profiles` - List all profiles
- `GET /api/profiles/:id` - Get profile details
- `POST /api/profiles` -
## Sample images of this webapp
https://drive.google.com/drive/folders/1Z2XEX7Mnw2QjaZnrNpn3KAQUx9rdORFk?usp=drive_link