import React, { useEffect, useMemo, useState } from "react";
import GrievanceTable from "../components/GrievanceTable";
import { fetchGrievances } from "../api/userService";
import { useTableFilter } from "../hooks/useTableFilter";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Pagination from "../components/Pagination";

export default function AllGrievances() {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadAllGrievances(page);
  }, [page]);

  const mapGrievance = (g) => ({
    id: g.grievanceId,
    name: g.name,
    subName: g.contact,
    fatherSpouseName: g.fatherSpouseName,
    block: g.block,
    gp: g.gp,
    villageSahi: g.villageSahi,
    wardNo: g.wardNo,
    location: g.address,
    topic: [g.topic1, g.topic2, g.topic3, g.topic4, g.topic5]
      .filter(Boolean)
      .join(", "),
    agentRemarks: g.agentRemarks,
    date: g.createdAt,
    status: g.status,
    agent: g.agentName || "Unassigned",
  });

  const loadAllGrievances = async (pageNo) => {
    try {
      const res = await fetchGrievances(pageNo);
      const list = res?.content || [];
      setGrievances(list.map(mapGrievance));
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Failed to load grievances", err);
    } finally {
      setLoading(false);
    }
  };

  const blocks = useMemo(() => {
    return [...new Set(grievances.map((g) => g.block).filter(Boolean))].sort();
  }, [grievances]);

  const { filters, setFilters, resetFilters, filteredData ,applyFilters} =
    useTableFilter(grievances);

  const exportToExcel = () => {
    const formattedData = filteredData.map((g) => ({
      "Grievance ID": g.id,
      "Citizen Name": g.name,
      "Contact": g.subName,
      "Father / Spouse": g.fatherSpouseName,
      "Block": g.block,
      "GP": g.gp,
      "Village": g.villageSahi,
      "Ward No": g.wardNo,
      "Address": g.location,
      "Topic": g.topic,
      "Status": g.status,
      "Assigned Agent": g.agent,
      "Created Date": new Date(g.date).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Grievances");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(fileData, `Grievance_Report_${Date.now()}.xlsx`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-72">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-x-hidden">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        All Grievance Details
      </h1>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">

          <div>
          <label className="text-xs font-semibold text-gray-600">Citizen Name</label>
          <input
            value={filters.name || ""}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            className="h-10 w-full rounded-md border px-3 text-sm"
            placeholder="Citizen Name"
          />
          </div>

          <div>
          <label className="text-xs font-semibold text-gray-600">Mobile Number</label>
          <input
            value={filters.contact || ""}
            onChange={(e) =>
              setFilters({ ...filters, contact: e.target.value })
            }
            className="h-10 w-full rounded-md border px-3 text-sm"
            placeholder="Mobile Number"
          />
          </div>

          <div>
          <label className="text-xs font-semibold text-gray-600">Ward No</label>
          <input
            value={filters.ward || ""}
            onChange={(e) => setFilters({ ...filters, ward: e.target.value })}
            className="h-10 w-full rounded-md border px-3 text-sm"
            placeholder="Ward No"
          />
          </div>

           <div>
          <label className="text-xs font-semibold text-gray-600">GP</label>
          <input
            value={filters.gp || ""}
            onChange={(e) => setFilters({ ...filters, gp: e.target.value })}
            className="h-10 w-full rounded-md border px-3 text-sm"
            placeholder="GP"
          />
          </div>

            <div>
            <label className="text-xs font-semibold text-gray-600">Father / Spouse</label>
          <input
            value={filters.father || ""}
            onChange={(e) => setFilters({ ...filters, father: e.target.value })}
            className="h-10 w-full rounded-md border px-3 text-sm"
            placeholder="Father / Spouse"
          />
          </div>

            <div>
            <label className="text-xs font-semibold text-gray-600">Date From</label>
          <input
            type="date"
            value={filters.dateFrom || ""}
            onChange={(e) =>
              setFilters({ ...filters, dateFrom: e.target.value })
            }
            className="h-10 w-full rounded-md border px-3 text-sm"
          />
          </div>

            <div>
            <label className="text-xs font-semibold text-gray-600">Date To</label>
          <input
            type="date"
            value={filters.dateTo || ""}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            className="h-10 w-full rounded-md border px-3 text-sm"
          />
          </div>

            <div>
            <label className="text-xs font-semibold text-gray-600">Topic</label>
          <input
            value={filters.topic || ""}
            onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
            className="h-10 w-full rounded-md border px-3 text-sm col-span-2"
            placeholder="Topic"
          />
          </div>
          

          <div>
            <label className="text-xs font-semibold text-gray-600">Status</label>
          <select
            value={filters.status || ""}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="h-10 w-full rounded-md border px-3 text-sm"
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="REJECTED">Rejected</option>
            <option value="REOPENED">Reopened</option>
          </select>
          </div>

          <select
            value={filters.block || ""}
            onChange={(e) => setFilters({ ...filters, block: e.target.value })}
            className="h-10 w-full rounded-md border px-3 text-sm"
          >
            <option value="">All Blocks</option>
            {blocks.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <div className="col-span-full flex justify-end">
            <div className="md:col-span-6 lg:col-span-6 flex justify-end gap-3">
              <button
                onClick={resetFilters}
                className="h-10 px-4 rounded-md text-sm bg-blue-400 text-white"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="h-10 px-5 bg-blue-600 text-white rounded-md text-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Export */}
      <div className="flex justify-end mb-3">
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white rounded-md text-sm"
        >
          Export to Excel
        </button>
      </div>

      {/* Table with horizontal scroll only */}
      <div className="overflow-x-auto">
        <GrievanceTable data={filteredData} />
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(p - 1, 0))}
        onNext={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
      />
    </div>
  );
}
