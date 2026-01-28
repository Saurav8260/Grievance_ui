import { useState } from "react";

export default function GrievanceFilter({ onFilter }) {
  const [filters, setFilters] = useState({
    status: "",
    block: "",
    wardNo: "",
    fromDate: "",
    toDate: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
const handleApply = () => {
  const query = new URLSearchParams(filters).toString();
  onFilter(query);
};


  const handleReset = () => {
    const reset = { status: "", block: "", wardNo: "", fromDate: "", toDate: "" };
    setFilters(reset);
    onFilter(""); // reload all
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow flex gap-4 items-end">
      <div>
        <label>Status</label>
        <select name="status" value={filters.status} onChange={handleChange} className="input">
          <option value="">All</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <div>
        <label>Block</label>
        <input name="block" value={filters.block} onChange={handleChange} className="input" />
      </div>

      <div>
        <label>Ward No</label>
        <input name="wardNo" value={filters.wardNo} onChange={handleChange} className="input" />
      </div>

      <div>
        <label>From Date</label>
        <input type="date" name="fromDate" value={filters.fromDate} onChange={handleChange} className="input" />
      </div>

      <div>
        <label>To Date</label>
        <input type="date" name="toDate" value={filters.toDate} onChange={handleChange} className="input" />
      </div>

      <button onClick={handleApply} className="px-4 py-2 bg-blue-600 text-white rounded">
        Apply Filter
      </button>

      <button onClick={handleReset} className="px-4 py-2 bg-gray-200 rounded">
        Reset
      </button>
    </div>
  );
}
