import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiFileText,
  FiUsers,
  FiSettings,
  FiLogOut, 
  FiCheck,
  FiActivity,
  FiMenu,
  FiUser,
  FiPlusCircle,
  FiLinkedin,   // ✅ new icon
} from "react-icons/fi";
import { FaHandshake } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  // const role = localStorage.getItem("role"); // ✅ get role
  const userId = localStorage.getItem("userId"); // ✅ get userId
  
  return (
    <aside className="w-20  bg-white h-screen flex flex-col items-center py-6">
      <div className="flex flex-col items-center space-y-6 py-6">
        {/* Logo */}
        <div className="w-15 h-15 bg-blue-600 rounded-full flex items-center justify-center">
          <FaHandshake className="text-white text-4xl" />
        </div>

        {/* Navigation Buttons */}
        <nav className="flex flex-col gap-4 mt-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-13 h-13 bg-white rounded-xl flex items-center justify-center
                       text-gray-400 hover:bg-gray-800 transition text-2xl"
            title="Home"
          >
            <FiHome className="text-xl" />
          </button>

          <button
            onClick={() => navigate("/userdetails")}
            className="w-13 h-13 bg-white rounded-xl flex items-center justify-center
                       text-gray-400 hover:bg-gray-800 transition"
            title="User Details"
          >
            <FiFileText className="text-xl" />
          </button>

          <button
            onClick={() => navigate("/AddAgent")}
            className="w-13 h-13 bg-white rounded-xl flex items-center justify-center
             text-gray-400 hover:bg-gray-800 transition"
            title="Add Agent"
          >
            <FiPlusCircle className="text-xl" />
          </button>

          <button
            onClick={() => navigate(`/profile/${userId}`)}

            className="w-13 h-13 bg-white rounded-xl flex items-center justify-center
                       text-gray-400 hover:bg-gray-800 transition"
            title="profile"
          >
            <FiUser className="text-xl" />
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="w-13 h-13 bg-white rounded-xl flex items-center justify-center
                       text-gray-400 hover:bg-gray-800 transition"
            title="Settings"
          >
            <FiSettings className="text-xl" />
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className=" hover:bg-red-700 w-13 h-13 bg-white rounded-xl flex items-center justify-center
                       text-gray-400 hover:bg-gray-800 transition"
            title="Logout"
          >
            <FiLogOut className="text-xl" />
          </button>
        </nav>
      </div>
    </aside>
  );
}
