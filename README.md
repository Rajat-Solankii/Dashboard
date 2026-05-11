# InsightDash – Modern Analytics Admin Panel

InsightDash is a high-performance, full-stack admin dashboard built with React, Vite, and Node.js. It features a sleek, modern UI with animated background gradients, responsive layouts, and real-time data visualization.

![Dashboard Preview](https://raw.githubusercontent.com/lucide-react/lucide/main/icons/layout-dashboard.svg)

## 🚀 Features

- **Full-Stack Authentication**: Secure Login and Signup flow using JWT (JSON Web Tokens) and password hashing with `bcryptjs`.
- **Dynamic Dashboard**: Real-time KPI tracking and interactive charts powered by Recharts.
- **Deep Analytics**: Dedicated analytics views with traffic breakdown and conversion rate tracking.
- **User Management**: Advanced data tables with client-side search, sorting, and status management.
- **Functional Settings**: Comprehensive settings panel with tabs for Notifications, Account details, Security, and Preferences.
- **Global Command Search**: A functional top-bar search that acts as a quick-navigator for the entire dashboard.
- **Premium UI/UX**:
  - Dark & Light mode support.
  - Animated blurred background gradients.
  - Responsive sidebar and mobile-friendly layouts.
  - Bespoke design tokens for a premium, non-generic look.
- **Local Database**: Integrated SQLite database using `better-sqlite3` for effortless local development.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Zustand (State Management), React Router 7.
- **Backend**: Node.js, Express.
- **Database**: SQLite (via `better-sqlite3`).
- **Icons**: Lucide React.
- **Charts**: Recharts.

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd admin-panel-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server (runs both Frontend and Backend):
   ```bash
   npm run dev
   ```

### Default Credentials

You can use the pre-seeded admin account to test the dashboard immediately:
- **Email**: `admin@insight.com`
- **Password**: `password123`

## 📁 Project Structure

- `src/`: React frontend application.
- `server/`: Express backend API and SQLite database configuration.
- `public/`: Static assets.
- `tailwind.config.js`: Custom theme and animation configuration.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
