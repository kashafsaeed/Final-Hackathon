
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

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

        <Route
          path="/dashboard"
          element={<Dashboard />}
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

        <Route
          path="/admin"
          element={<AdminDashboard />}
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

