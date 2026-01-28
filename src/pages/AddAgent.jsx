// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { createUser } from "../api/userService";

// export default function AddAgent() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     contact: "",
//     newPassword: "",
//     role: "AGENT",
//     active: true,
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       console.log("Sending payload:", form);
//       await createUser(form);
//       alert("Agent created successfully");
//       navigate("/dashboard");
//     } catch (err) {
//       alert(err.message || "Failed to create user");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200"
//       >
//         <h2 className="text-2xl font-extrabold mb-6 text-center text-indigo-700">
//           Create New User
//         </h2>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Full Name
//             </label>
//             <input
//               name="name"
//               placeholder="Enter full name"
//               onChange={handleChange}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-xl"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Contact Number
//             </label>
//             <input
//               name="contact"
//               placeholder="Enter phone number"
//               onChange={handleChange}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-xl"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Email Address
//             </label>
//             <input
//               name="email"
//               type="email"
//               placeholder="Enter email"
//               onChange={handleChange}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-xl"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Password
//             </label>
//             <input
//               name="newPassword"
//               type="password"
//               placeholder="Create a strong password"
//               onChange={handleChange}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-xl"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Role
//             </label>
//             <select
//               name="role"
//               value={form.role}
//               onChange={handleChange}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white"
//               required
//             >
//               <option value="ADMIN">Admin</option>
//               <option value="AGENT">Agent</option>
//               <option value="USER">User</option>
//             </select>
//           </div>
//         </div>

//         <button className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg">
//           Create User
//         </button>
//       </form>
//     </div>
//   );
// }
