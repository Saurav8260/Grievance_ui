import React, { useEffect, useState } from "react";
import { fetchGrievances } from "../api/userService";

export default function GrievanceList() {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    fetchGrievances()
      .then((res) => {
        const list = Array.isArray(res) ? res : res.data; // handle wrapped response
        setGrievances(list);
      })
      .catch((err) => console.error("Grievance API error:", err));
  }, []);

  console.log("Grievances loaded:", grievances);

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">All Grievances</h2>

      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Father/Spouse</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">Block</th>
            <th className="border p-2">GP</th>
            <th className="border p-2">Village</th>
            <th className="border p-2">Ward</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Topic</th>
            <th className="border p-2">Details</th>
            <th className="border p-2">Agent</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Admin Date</th>
          </tr>
        </thead>
        <tbody>
          {grievances.map((g) => (
            <tr key={g.id || g.grievanceId}>
              <td className="border p-2">{g.id || g.grievanceId}</td>
              <td className="border p-2">{g.name}</td>
              <td className="border p-2">{g.fatherSpouseName}</td>
              <td className="border p-2">{g.contact}</td>
              <td className="border p-2">{g.block}</td>
              <td className="border p-2">{g.gp}</td>
              <td className="border p-2">{g.villageSahi}</td>
              <td className="border p-2">{g.wardNo}</td>
              <td className="border p-2">{g.address}</td>
              <td className="border p-2">{g.topic1}</td>
              <td className="border p-2">{g.grievanceDetails}</td>
              <td className="border p-2">{g.agentName}</td>
              <td className="border p-2">{g.workGivenTo}</td>
              <td className="border p-2">{g.status}</td>
              <td className="border p-2">{g.adminDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { getGrievanceFilter } from "../api/userService";
// import GrievanceFilter from "../components/GrievanceFilter";

// export default function GrievanceList() {
//   const [grievances, setGrievances] = useState([]);

//   useEffect(() => {
//     // Load all grievances initially
//     getGrievanceFilter("")
//       .then((res) => {
//         const list = Array.isArray(res) ? res : res.data;
//         setGrievances(list);
//       })
//       .catch((err) => console.error("Grievance API error:", err));
//   }, []);

//   const applyFilter = (queryString) => {
//     console.log("Calling API with:", queryString);

//     getGrievanceFilter(queryString)
//       .then((res) => {
//         const list = Array.isArray(res) ? res : res.data;
//         setGrievances(list);
//       })
//       .catch((err) => console.error("Filter API error:", err));
//   };

//   return (
//     <div className="p-6 overflow-x-auto">
//       <h2 className="text-xl font-bold mb-4">All Grievances</h2>

//       <GrievanceFilter onFilter={applyFilter} />

//       <table className="min-w-full border text-sm mt-4">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border p-2">ID</th>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Father/Spouse</th>
//             <th className="border p-2">Contact</th>
//             <th className="border p-2">Block</th>
//             <th className="border p-2">GP</th>
//             <th className="border p-2">Village</th>
//             <th className="border p-2">Ward</th>
//             <th className="border p-2">Address</th>
//             <th className="border p-2">Topic</th>
//             <th className="border p-2">Details</th>
//             <th className="border p-2">Agent</th>
//             <th className="border p-2">Department</th>
//             <th className="border p-2">Status</th>
//             <th className="border p-2">Admin Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {grievances.map((g) => (
//             <tr key={g.id || g.grievanceId}>
//               <td className="border p-2">{g.id || g.grievanceId}</td>
//               <td className="border p-2">{g.name}</td>
//               <td className="border p-2">{g.fatherSpouseName}</td>
//               <td className="border p-2">{g.contact}</td>
//               <td className="border p-2">{g.block}</td>
//               <td className="border p-2">{g.gp}</td>
//               <td className="border p-2">{g.villageSahi}</td>
//               <td className="border p-2">{g.wardNo}</td>
//               <td className="border p-2">{g.address}</td>
//               <td className="border p-2">{g.topic1}</td>
//               <td className="border p-2">{g.grievanceDetails}</td>
//               <td className="border p-2">{g.agentName}</td>
//               <td className="border p-2">{g.workGivenTo}</td>
//               <td className="border p-2">{g.status}</td>
//               <td className="border p-2">{g.adminDate}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
