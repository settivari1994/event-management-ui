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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://event-management-api-production-94b1.up.railway.app/auth/register", form);
      navigate("/");

    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="w-96 bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
          />

          <select
            name="role"
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            value={form.role}
          >
            <option value="SELECT">SELECT ROLE</option>
            {/* <option value="ADMIN">ADMIN</option> */}
            <option value="ORGANIZER">ORGANIZER</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
          >
            Register
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