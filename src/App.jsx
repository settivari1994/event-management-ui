import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/pages/login";
import Register from "./pages/register";
import Agent from "./pages/agent";
import Admin from "./pages/admin";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



// function Organizer() {
//   return <h1>Organizer Dashboard</h1>;
// }

function Customer() {
  return <h1>Customer Dashboard</h1>;
}

export default function App() {


  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organizer"
          element={
            <ProtectedRoute role="ORGANIZER">
              <Agent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer"
          element={
            <ProtectedRoute role="CUSTOMER">
              <Customer />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}