// import { useEffect, useState } from "react";
// import { getAllUsers, patchUserStatus } from "../api/userService";

// export default function UserList() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         throw new Error("No token found. Please login again.");
//       }

//       const data = await getAllUsers(token);
//       setUsers(data);
//     } catch (err) {
//       console.error("Fetch users error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-72">
//         <div className="relative">
//           <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       </div>
//     );

//   return (
//     <div className="p-8">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-3xl font-extrabold text-gray-800">
//             User Management
//           </h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Monitor, manage, and control all platform users
//           </p>
//         </div>
//       </div>

//       {/* Table Card */}
//       <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
//               <tr>
//                 <th className="px-6 py-4 text-left font-semibold tracking-wide">
//                   Name
//                 </th>
//                 <th className="px-6 py-4 text-left font-semibold tracking-wide">
//                   Contact
//                 </th>
//                 <th className="px-6 py-4 text-left font-semibold tracking-wide">
//                   Role
//                 </th>
//                 <th className="px-6 py-4 text-left font-semibold tracking-wide">
//                   Status
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-200">
//               {users.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className="text-center py-10 text-gray-500">
//                     No users found
//                   </td>
//                 </tr>
//               ) : (
//                 users.map((u) => (
//                   <tr
//                     key={u.id}
//                     className="hover:bg-blue-50 transition-colors duration-200"
//                   >
//                     <td className="px-6 py-4 font-medium text-gray-800">
//                       {u.name}
//                     </td>
//                     <td className="px-6 py-4 text-gray-600">{u.contact}</td>
//                     <td className="px-6 py-4">
//                       <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
//                         {u.role}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       {(() => {
//                         const isActive =
//                           u.is_active === true ||
//                           u.is_active === 1 ||
//                           u.status === true ||
//                           u.active === 1 ||
//                           u.isActive === true;

//                         return (
//                           <button
//                             onClick={async () => {
//                               try {
//                                 const newStatus = !isActive;
//                                 await patchUserStatus(u.id, newStatus);

//                                 setUsers((prev) =>
//                                   prev.map((user) =>
//                                     user.id === u.id
//                                       ? { ...user, isActive: newStatus }
//                                       : user
//                                   )
//                                 );
//                               } catch (err) {
//                                 alert("Failed to update status");
//                               }
//                             }}
//                             className={`px-3 py-1 rounded-full text-xs font-bold transition ${
//                               isActive
//                                 ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
//                                 : "bg-rose-100 text-rose-700 hover:bg-rose-200"
//                             }`}
//                           >
//                             {isActive ? "Active" : "Inactive"}
//                           </button>
//                         );
//                       })()}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { getAllUsers, patchUserStatus, createUser } from "../api/userService";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    newPassword: "",
    role: "AGENT",
    active: true,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getAllUsers(token);
      setUsers(data);
    } catch (err) {
      console.error("Fetch users error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(form);
      alert("Agent created successfully");
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      alert(err.message || "Failed to create user");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-72">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor, manage, and control all platform users
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          + Add Agent
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Contact</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-blue-50">
                  <td className="px-6 py-4 font-medium">{u.name}</td>
                  <td className="px-6 py-4">{u.contact}</td>
                  <td className="px-6 py-4">{u.role}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={async () => {
                        try {
                          const newStatus = !u.isActive;
                          await patchUserStatus(u.id, newStatus);
                          setUsers((prev) =>
                            prev.map((user) =>
                              user.id === u.id ? { ...user, isActive: newStatus } : user
                            )
                          );
                        } catch {
                          alert("Failed to update status");
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        u.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {u.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Agent Modal (Your form, merged) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-5 text-center text-indigo-700 bg-blue-700 text-white py-2 rounded-lg">
              Create New User
            </h2>

            <div className="space-y-4">
              <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />

              <input
                name="contact"
                placeholder="Contact Number"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />

              <input
                name="newPassword"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="ADMIN">Admin</option>
                <option value="AGENT">Agent</option>
                <option value="USER">User</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
