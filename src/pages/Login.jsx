import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/userService";

export default function Login() {
  const [form, setForm] = useState({
    name: "",
    password: "",
    role: "admin",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.password) {
      setError(" name and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser(form);

      console.log(res);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.name));
      localStorage.setItem("role", res.role);
      localStorage.setItem("userId", res.userId);

      // Force user to enter name before dashboard
      const savedName = localStorage.getItem("dashboard_name");
      if (!savedName) {
        const name = prompt("Please enter your name to continue:");
        if (!name || !name.trim()) {
          setError("Name is required to enter dashboard");
          setLoading(false);
          return;
        }
        localStorage.setItem("dashboard_name", name);
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-blue-700">Welcome Back</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Login to access your dashboard
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-5 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              User Name
            </label>
            <input
              type="text"
              placeholder="Enter user name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
