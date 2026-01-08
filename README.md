# UrbanSense Admin Dashboard

A comprehensive web-based Admin Dashboard for managing city infrastructure, complaints, and officers for the UrbanSense smart city project.

## 🚀 Features

### 1. Officer Registration & Management (Core Feature)
- Register new field officers with mobile numbers for app authentication
- Assign departments and zones/areas
- Edit officer details
- Activate/Deactivate officers
- View officer performance metrics

### 2. Complaint Monitoring
- View all city-wide complaints
- Filter by department, status, priority, and area
- View before/after images
- Track complaint resolution timeline

### 3. City Overview Dashboard
- Real-time statistics (complaints today, active, resolved, critical)
- Weekly and monthly trend charts
- Complaint status distribution
- Department-wise complaint breakdown

### 4. Department Analytics
- Complaints per department visualization
- Resolution time comparison
- Efficiency scores
- Monthly trends analysis

### 5. AI Insights (Mock)
- Recurring problem area identification
- Risk zone indicators
- Predictive alerts
- Problem hotspots map

### 6. Officer Performance Tracking
- Top performers leaderboard
- Response time metrics
- Feedback scores
- Department-wise comparison

## 🛠️ Tech Stack

- **React.js** (v19+) - Frontend framework
- **Vite** - Build tool and dev server
- **Material UI (MUI)** - UI component library
- **Recharts** - Chart library for analytics
- **React Router v7** - Client-side routing
- **Day.js** - Date manipulation

## 📁 Project Structure

```
src/
├── components/
│   ├── Common/
│   │   └── StatCard.jsx
│   ├── Layout/
│   │   └── DashboardLayout.jsx
│   └── ProtectedRoute.jsx
├── context/
│   └── AuthContext.jsx
├── data/
│   └── mockData.js
├── pages/
│   ├── Analytics/
│   │   └── Analytics.jsx
│   ├── Complaints/
│   │   └── Complaints.jsx
│   ├── Dashboard/
│   │   └── Dashboard.jsx
│   ├── Insights/
│   │   └── AIInsights.jsx
│   ├── Login/
│   │   └── Login.jsx
│   ├── Officers/
│   │   └── OfficerManagement.jsx
│   └── Performance/
│       └── Performance.jsx
├── theme/
│   └── theme.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Demo Credentials

- **Email:** admin@urbansense.gov
- **Password:** admin123

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔐 Authentication

The dashboard uses a simple mock authentication system. In production, this should be replaced with a proper authentication backend (JWT, OAuth, etc.).

## 🎨 Customization

### Theme
The theme can be customized in `src/theme/theme.js`. Key customization options:
- Primary/Secondary colors
- Typography
- Component overrides
- Shadows

### Mock Data
All mock data is centralized in `src/data/mockData.js`. This includes:
- Officers list
- Complaints
- Departments
- Areas/Zones
- AI Insights
- Dashboard statistics

## 🔄 Backend-Ready Architecture

The project is structured to be easily integrated with a backend API:

1. **Data Layer:** All mock data is in one file, easy to replace with API calls
2. **Auth Context:** Ready for real authentication integration
3. **State Management:** Can be extended with Redux/Zustand if needed
4. **API Structure:** Components follow patterns suitable for REST/GraphQL

## 📄 License

This project is licensed under the MIT License.
