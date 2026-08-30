import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  return (
    <Routes>

      {/* =========================
          DEFAULT
      ========================= */}

      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />


      {/* =========================
          PUBLIC ROUTES
      ========================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* =========================
          CUSTOMER ROUTES
      ========================= */}

      <Route
        element={
          <ProtectedRoute
            allowedRole="customer"
          />
        }
      >

        {/* Customer Dashboard */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Customer Settings */}

        <Route
          path="/dashboard/settings"
          element={<Settings />}
        />

      </Route>


      {/* =========================
          ADMIN ROUTES
      ========================= */}

      <Route
        element={
          <ProtectedRoute
            allowedRole="admin"
          />
        }
      >

        {/* Admin Dashboard */}

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        {/* Admin Settings */}

        <Route
          path="/admin/settings"
          element={<Settings />}
        />

      </Route>


      {/* =========================
          404
      ========================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

    </Routes>
  );
};


export default App;