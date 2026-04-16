import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8080/auth/login", {
                username,
                password,
            });

            const token = res.data.token;

            // 💾 Save token
            localStorage.setItem("token", token);

            // 🔍 Decode role
            const decoded = jwtDecode(token);
            const role = decoded.role.replace("ROLE_", "");

            // 🚀 Redirect based on role
            if (role === "ADMIN") {
                navigate("/admin");
            } else if (role === "ORGANIZER") {
                navigate("/organizer");
            } else {
                navigate("/customer");
            }

        } catch (err) {
            alert("Invalid username or password");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="w-96 bg-white p-8 rounded-2xl shadow-lg">

                <h2 className="text-2xl font-bold text-center mb-6">
                    Login
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">

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
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                    >
                        Login
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-sm">
                            Don’t have an account?
                            <Link to="/register" className="text-blue-600 ml-1 font-semibold">
                                Register
                            </Link>
                        </p>
                    </div>

                </form>

            </div>
        </div>
    );
}