import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // clear previous error
        setError("");

        if (!username || !password) {
            setError("Please enter username and password");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post(
                "https://event-management-api-production-94b1.up.railway.app/auth/login",
                {
                    username,
                    password,
                }
            );

            const token = res.data.token;

            // Save token
            localStorage.setItem("token", token);

            // Decode role
            let role = "CUSTOMER";
            try {
                const decoded = jwtDecode(token);
                role = decoded.role?.replace("ROLE_", "") || "CUSTOMER";
            } catch (err) {
                console.error("Token decode failed", err);
            }

            localStorage.setItem("role", role);

            // Redirect
            if (role === "ADMIN") {
                navigate("/admin");
            } else if (role === "ORGANIZER") {
                navigate("/organizer");
            } else {
                navigate("/customer");
            }

        } catch (err) {
            setError("Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="w-96 bg-white p-8 rounded-2xl shadow-lg">

                <h2 className="text-2xl font-bold text-center mb-6">
                    Login
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">

                    {/* ERROR MESSAGE */}
                    {error && (
                        <div className="bg-red-100 text-red-600 p-2 rounded text-sm text-center">
                            {error}
                        </div>
                    )}

                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-3 border rounded-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-3 rounded-lg text-white ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-sm">
                            Don’t have an account?
                            <Link
                                to="/register"
                                className="text-blue-600 ml-1 font-semibold"
                            >
                                Register
                            </Link>
                        </p>
                    </div>

                </form>

            </div>
        </div>
    );
}