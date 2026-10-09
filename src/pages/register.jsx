import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
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

    // Name, phone number and password are mandatory
    if (
      !form.name?.trim() ||
      !form.username?.trim() ||
      !form.password
    ) {
      setError("Name, phone number and password are required");
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
        {
          ...form,
          name: form.name.trim(),
          email: form.email?.trim() || null,
        }
      );

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Try again."
      );
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

          <input type="text" name="name" placeholder="Full Name *" className="w-full p-3 border rounded-lg" value={form.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address (Optional)" className="w-full p-3 border rounded-lg" value={form.email} onChange={handleChange} />

          <input
            type="text"
            name="username"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            value={form.username}
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
            <option value="ORGANIZER">Agent</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Already have an agent account?
          <Link to="/" className="text-blue-600 ml-1 font-semibold">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}