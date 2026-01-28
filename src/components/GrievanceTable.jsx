import React from "react";
import { TbDashboard } from "react-icons/tb";
import { Link } from "react-router-dom";

function StatusBadge({ status }) {
  const normalized = status?.toLowerCase();

  const map = {
    completed: "bg-green-100 text-green-800",
    complete: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    "not complete": "bg-red-100 text-red-800",
    "not completed": "bg-red-100 text-red-800",
  };

  const cls = map[normalized] || "bg-gray-100 text-gray-800";

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${cls}`}>
      {status}
    </span>
  );
}

/* ================= MAIN TABLE ================= */
export default function GrievanceTable({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto max-h-[500px] max-w-[1500px] overflow-y-auto">
        <table className="w-full border-collapse text-sm">
          {/* ================= HEADER ================= */}
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="border-b">
              {[
                "SL No.",
                "Name",
                "Father/Spouse Name",
                "Block",
                  "GP",
                  "Village/Sahi",
                "wardNo",
                "Location",
                "Topic",
               " Remarks",
                "Date",
                "Status",
                "Agent",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className={`py-3 px-4 font-semibold text-gray-600 uppercase tracking-wide ${
                    h === "Actions" ? "text-center" : "text-left"
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          {/* ================= BODY ================= */}
          <tbody className="divide-y">
            {data && data.length > 0 ? (
              data.map((row, i) => (
                <tr
                  key={row.id || i}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-700">{i + 1}</td>

                  <td className="py-3 px-4">
                    <div className="font-semibold text-gray-800">
                      {row.name}
                    </div>
                    <div className="text-xs text-gray-500">{row.subName}</div>
                  </td>

                  <td className="py-3 px-4 text-gray-700">
                    {row.fatherSpouseName}
                  </td>
                   <td className="py-3 px-4 text-gray-700">{row.block}</td>
                    <td className="py-3 px-4 text-gray-700">{row.gp}</td>
                     <td className="py-3 px-4 text-gray-700">{row.villageSahi}</td>
                  <td className="py-3 px-4 text-gray-700">{row.wardNo}</td>
                  <td className="py-3 px-4 text-gray-700">{row.location}</td>
                  <td className="py-3 px-4 text-gray-700">{row.topic}</td>
                  <td className="py-3 px-4 text-gray-700">{row.agentRemarks}</td>
                  <td className="py-3 px-4 text-gray-700">{row.date}</td>

                  <td className="py-3 px-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-3 px-4 text-gray-700">{row.agent}</td>

                  {/* ================= ACTIONS ================= */}
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      {/* VIEW BUTTON */}
                      <Link to={`/grievance/${row.id}`}>
                        <button className="px-3 py-1.5 rounded-md text-xs font-semibold text-blue-600 bg-blue-100 hover:bg-blue-200 transition">
                          View
                        </button>
                      </Link>

                      {/* EDIT BUTTON */}
                      <Link to={`/grievance/edit/${row.id}`}>
                        <button className="px-3 py-1.5 rounded-md text-xs font-semibold text-amber-600 bg-amber-100 hover:bg-amber-200 transition">
                          Edit
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-8 text-center text-gray-500">
                  No grievances found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
