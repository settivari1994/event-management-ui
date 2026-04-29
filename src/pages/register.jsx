import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "SELECT"
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    // clear error while typing
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    // ✅ Basic validation
    if (!form.username || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (form.role === "SELECT") {
      setError("Please select a role");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "https://event-management-api-production-94b1.up.railway.app/auth/register",
        form
      );

      navigate("/");

    } catch (err) {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="w-96 bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded text-sm text-center">
              {error}
            </div>
          )}

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            value={form.username}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            value={form.email}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            value={form.password}
          />

          <select
            name="role"
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            value={form.role}
          >
            <option value="SELECT">SELECT ROLE</option>
            <option value="ORGANIZER">ORGANIZER</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?
          <Link to="/" className="text-blue-600 ml-1 font-semibold">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}