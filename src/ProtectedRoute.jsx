import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    const currentTime = Date.now() / 1000;

    // ❌ expired token
    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/" replace />;
    }

    const userRole = decoded.role.replace("ROLE_", "");

    if (role && userRole !== role) {
      return <Navigate to="/" replace />;
    }

    return children;

  } catch (e) {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
}