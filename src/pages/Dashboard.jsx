
// import React, { useState, useMemo, useEffect } from "react";
// import StatsCard from "../components/StatsCard";
// import GrievanceTable from "../components/GrievanceTable";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { FiInbox, FiClock, FiCheckCircle, FiUsers } from "react-icons/fi";
// import { useTableFilter } from "../hooks/useTableFilter";
// import { getDashboardStats, fetchGrievances } from "../api/userService";

// export default function Dashboard() {
//   const [query, setQuery] = useState("");
//   const [tab, setTab] = useState("RECENT");

//   const [stats, setStats] = useState({
//     totalGrievances: 0,
//     pending: 0,
//     completed: 0,
//     activeAgents: 0,
//   });

//   const [grievances, setGrievances] = useState([]);

//   useEffect(() => {
//     if (tab === "RECENT") {
//       loadRecentGrievances();
//     } else if (tab === "ALL") {
//       loadAllGrievances();
//     }
//   }, [tab]);

//   const loadRecentGrievances = async () => {
//     try {
//       const data = await getDashboardStats();

//       setStats({
//         totalGrievances: data.totalGrievances,
//         pending: data.grievanceStatusCounts?.PENDING || 0,
//         completed: data.grievanceStatusCounts?.COMPLETED || 0,
//         activeAgents: data.totalUsers || 0,
//       });

//       const grievanceList = (data.recentActivity || []).map((g) => ({
//         id: g.grievanceId,
//         name: g.name,
//         subName: g.contact,
//         fatherSpouseName: g.fatherSpouseName,
//         block: g.block,
//         gp: g.gp,
//         villageSahi: g.villageSahi,
//         wardNo: g.wardNo,
//         location: g.address,
//         topic: g.topic1 + ", " + g.topic2 + ", " + g.topic3+","+ g.topic4+", "+ g.topic5,
//         agentRemarks: g.agentRemarks,

//         date: g.createdAt,
//         status: g.status,
//         agent: g.agentName || "Unassigned",
//       }));

//       setGrievances(grievanceList);
//     } catch (error) {
//       console.error("Dashboard load error:", error);
//     }
//   };

//   const loadAllGrievances = async () => {
//     try {
//       const res = await fetchGrievances();
//       const list = res?.content || [];

//       const grievanceList = list.map((g) => ({
//         id: g.grievanceId,
//         name: g.name,
//         subName: g.contact,
//         fatherSpouseName: g.fatherSpouseName,
//         location: g.address,
//         topic: g.topic1 + ",  " + g.topic2 + ", " + g.topic3+","+ g.topic4+", "+ g.topic5,
//         agentRemarks: g.agentRemarks,
//         block: g.block,
//         gp: g.gp,
//         villageSahi: g.villageSahi,
//         wardNo: g.wardNo,

//         date: g.createdAt,
//         status: g.status,
//         agent: g.agentName || "Unassigned",
//       }));

//       setGrievances(grievanceList);
//     } catch (error) {
//       console.error("All grievance load error:", error);
//     }
//   };

//   const blocks = useMemo(() => {
//     if (!Array.isArray(grievances)) return [];
//     return [...new Set(grievances.map((g) => g.block).filter(Boolean))].sort();
//   }, [grievances]);

//   const searchedData = Array.isArray(grievances)
//     ? grievances.filter((g) =>
//         (g.name + g.subName + g.topic + g.location)
//           .toLowerCase()
//           .includes(query.toLowerCase())
//       )
//     : [];

//   const { filters, setFilters, applyFilters, resetFilters, filteredData } =
//     useTableFilter(searchedData);

//    const userName = JSON.parse(localStorage.getItem("user"));

//   return (
//     <div className="flex min-h-screen bg-gray-100 p-3 sm:p-4 md:p-6 lg:p-8">
//       <main className="flex-1 p-8 bg-gray-100 min-h-screen">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-3xl font-bold text-black">
//             Grievance Management Dashboard
//             <p className="text-sm text-gray-500">
//               Welcome,{" "}
//               <span className="font-semibold text-blue-600">{userName}</span>
//             </p>
//           </h2>

//           {/* <div className="relative">
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search grievances, agents..."
//               className="w-80 pl-10 pr-4 py-2 rounded-lg bg-white text-gray-400"
//             />
//             <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
//           </div> */}
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-4 gap-4 mb-6">
//           <StatsCard
//             label="Total Grievances"
//             value={stats.totalGrievances}
//             icon={<FiInbox className="text-yellow-600 text-2xl" />}
//           />
//           <StatsCard
//             label="Pending"
//             value={stats.pending}
//             icon={<FiClock className="text-blue-600 text-2xl" />}
//           />
//           <StatsCard
//             label="Completed"
//             value={stats.completed}
//             icon={<FiCheckCircle className="text-green-600 text-2xl" />}
//           />
//           <StatsCard
//             label="Active Agents"
//             value={stats.activeAgents}
//             icon={<FiUsers className="text-pink-500 text-2xl" />}
//           />
//         </div>

//         {/* Tabs */}
//         <div className="bg-white rounded-xl shadow p-4 mb-6">
//           <div className="flex items-center gap-6 pb-4 mb-4">
//             {/* <button
//               onClick={() => setTab("RECENT")}
//               className="relative pb-2 text-sm font-medium text-gray-600"
//             >
//               Recent
//               <span
//                 className={`absolute left-0 -bottom-1 h-[2px] w-full bg-blue-600 transition-all ${
//                   tab === "RECENT" ? "scale-x-100" : "scale-x-0"
//                 }`}
//               />
//             </button> */}

//             {/* <button
//               onClick={() => setTab("ALL")}
//               className="relative pb-2 text-sm font-medium text-gray-600"
//             >
//               All Grievances
//               <span
//                 className={`absolute left-0 -bottom-1 h-[2px] w-full bg-blue-600 transition-all ${
//                   tab === "ALL" ? "scale-x-100" : "scale-x-0"
//                 }`}
//               />
//             </button> */}

//             {/* <button
//               onClick={() => setTab("ASSIGNED")}
//               className="relative pb-2 text-sm font-medium text-gray-600"
//             >
//               Assigned to Me
//               <span
//                 className={`absolute left-0 -bottom-1 h-[2px] w-full bg-blue-600 transition-all ${
//                   tab === "ASSIGNED" ? "scale-x-100" : "scale-x-0"
//                 }`}
//               />
//             </button> */}
//           </div>

//           {/* Filters */}
//           {/* <div className="bg-white rounded-xl shadow-sm p-5">
        //     <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">

        //   <div>
        //     <label className="text-xs font-semibold text-gray-600">Name</label>
        //     <input
        //       value={filters.name || ""}
        //       onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        //       className="h-10 w-full rounded-md  px-3 text-sm"
        //       placeholder="Citizen Name"
        //     />
        //   </div>

        //   <div>
        //     <label className="text-xs font-semibold text-gray-600">Mobile</label>
        //     <input
        //       value={filters.contact || ""}
        //       onChange={(e) => setFilters({ ...filters, contact: e.target.value })}
        //       className="h-10 w-full rounded-md  px-3 text-sm"
        //       placeholder="Mobile Number"
        //     />
        //   </div>

        //   <div>
        //     <label className="text-xs font-semibold text-gray-600">Ward No</label>
        //     <input
        //       value={filters.ward || ""}
        //       onChange={(e) => setFilters({ ...filters, ward: e.target.value })}
        //       className="h-10 w-full rounded-md  px-3 text-sm"
        //       placeholder="Ward No"
        //     />
        //   </div>

        //   <div>
        //     <label className="text-xs font-semibold text-gray-600">Father / Spouse</label>
        //     <input
        //       value={filters.father || ""}
        //       onChange={(e) => setFilters({ ...filters, father: e.target.value })}
        //       className="h-10 w-full rounded-md px-3 text-sm"
        //       placeholder="Father / Spouse Name"
        //     />
        //   </div>

        //   <div>
        //     <label className="text-xs font-semibold text-gray-600">From Date</label>
        //     <input
        //       type="date"
        //       value={filters.dateFrom || ""}
        //       onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
        //       className="h-10 w-full rounded-md px-3 text-sm"
        //     />
        //   </div>

        //   <div>
        //     <label className="text-xs font-semibold text-gray-600">To Date</label>
        //     <input
        //       type="date"
        //       value={filters.dateTo || ""}
        //       onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
        //       className="h-10 w-full rounded-md px-3 text-sm"
        //     />
        //   </div>

        //   <div className="md:col-span-2 lg:col-span-3">
        //     <label className="text-xs font-semibold text-gray-600">Topic</label>
        //     <input
        //       value={filters.topic || ""}
        //       onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
        //       className="h-10 w-full rounded-md px-3 text-sm"
        //       placeholder="Search in grievance topics"
        //     />
        //   </div>

        //   <div>
        //     <label className="text-xs font-semibold text-gray-600">Status</label>
        //     <select
        //       value={filters.status || ""}
        //       onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        //       className="h-10 w-full rounded-md px-3 text-sm"
        //     >
        //       <option value="">All</option>
        //       <option value="PENDING">Pending</option>
        //       <option value="IN_PROGRESS">In Progress</option>
        //       <option value="COMPLETED">Completed</option>
        //       <option value="REJECTED">Rejected</option>
        //       <option value="REOPENED">Reopened</option>
        //     </select>
        //   </div>

        //   <div>
        //     <label className="text-xs font-semibold text-gray-600">Block</label>
        //     <select
        //       value={filters.block || ""}
        //       onChange={(e) => setFilters({ ...filters, block: e.target.value })}
        //       className="h-10 w-full rounded-md px-3 text-sm"
        //     >
        //       <option value="">All Blocks</option>
        //       {blocks.map((b) => (
        //         <option key={b} value={b}>{b}</option>
        //       ))}
        //     </select>
        //   </div>

        //   <div className="md:col-span-6 lg:col-span-6 flex justify-end gap-3">
        //     <button
        //       onClick={resetFilters}
        //       className="h-10 px-4 rounded-md text-sm"
        //     >
        //       Reset
        //     </button>
        //     <button
        //       onClick={applyFilters}
        //       className="h-10 px-5 bg-blue-600 text-white rounded-md text-sm"
        //     >
        //       Apply Filters
        //     </button>
        //   </div>
        // </div>
        //   </div> */}
//         </div>

//         <GrievanceTable data={filteredData} />
//       </main>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import StatsCard from "../components/StatsCard";
import GrievanceTable from "../components/GrievanceTable";
import AddGrievanceModal from "../components/AddGrievanceModal";
import { FiInbox, FiClock, FiCheckCircle, FiUsers } from "react-icons/fi";
import { useTableFilter } from "../hooks/useTableFilter";
import { getDashboardStats } from "../api/userService";

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [openAddGrievance, setOpenAddGrievance] = useState(false);

  const [stats, setStats] = useState({
    totalGrievances: 0,
    pending: 0,
    completed: 0,
    activeAgents: 0,
  });

  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    loadRecentGrievances();
  }, []);

  const loadRecentGrievances = async () => {
    try {
      const data = await getDashboardStats();

      setStats({
        totalGrievances: data.totalGrievances,
        pending: data.grievanceStatusCounts?.PENDING || 0,
        completed: data.grievanceStatusCounts?.COMPLETED || 0,
        activeAgents: data.totalUsers || 0,
      });

      const grievanceList = (data.recentActivity || []).map((g) => ({
        id: g.grievanceId,
        name: g.name,
        subName: g.contact,
        fatherSpouseName: g.fatherSpouseName,
        block: g.block,
        gp: g.gp,
        villageSahi: g.villageSahi,
        wardNo: g.wardNo,
        location: g.address,
        topic:
          g.topic1 +
          ", " +
          g.topic2 +
          ", " +
          g.topic3 +
          ", " +
          g.topic4 +
          ", " +
          g.topic5,
        agentRemarks: g.agentRemarks,
        date: g.createdAt,
        status: g.status,
        agent: g.agentName || "Unassigned",
      }));

      setGrievances(grievanceList);
    } catch (error) {
      console.error("Dashboard load error:", error);
    }
  };

  const searchedData = grievances.filter((g) =>
    (g.name + g.subName + g.topic + g.location)
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const { filteredData } = useTableFilter(searchedData);

  const userName = localStorage.getItem("dashboard_name");

  return (
    <div className="flex min-h-screen bg-gray-100 p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden max-w-screen">
      <main className="flex-1  bg-gray-100 min-h-screen max-w-screen overflow-x-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 overflow-x-hidden max-w-screen">
          <div>
            <h2 className="text-3xl font-bold text-black">
              Grievance Management Dashboard
            </h2>
            <p className="text-sm text-gray-500">
              Welcome,{" "}
              <span className="font-semibold text-blue-600">{userName}</span>
            </p>
          </div>

          <button
            onClick={() => setOpenAddGrievance(true)}
            className="h-10 px-4 bg-blue-600 text-white rounded-md text-sm"
          >
            + Add Grievance
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            label="Total Grievances"
            value={stats.totalGrievances}
            icon={<FiInbox className="text-yellow-600 text-2xl" />}
          />
          <StatsCard
            label="Pending"
            value={stats.pending}
            icon={<FiClock className="text-blue-600 text-2xl" />}
          />
          <StatsCard
            label="Completed"
            value={stats.completed}
            icon={<FiCheckCircle className="text-green-600 text-2xl" />}
          />
          <StatsCard
            label="Active Agents"
            value={stats.activeAgents}
            icon={<FiUsers className="text-pink-500 text-2xl" />}
          />
        </div>

        {/* Table (only this scrolls horizontally) */}
        <div className=" overflow-x-auto">
          <GrievanceTable data={filteredData} />
        </div>

        {/* Add Grievance Popup */}
        {openAddGrievance && (
          <AddGrievanceModal
            onClose={() => setOpenAddGrievance(false)}
            onSuccess={() => loadRecentGrievances()}
          />
        )}
      </main>
    </div>
  );
}
