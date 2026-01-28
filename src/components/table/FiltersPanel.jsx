import { useState } from "react";
import { getGrievanceFilter } from "../../api/userService";

const initialFilters = {
  status: "",
  block: "",
  wardNo: "",
  dateFrom: "",
  dateTo: "",
};

export const useTableFilter = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [filteredData, setFilteredData] = useState([]);

  const applyFilters = async () => {
    try {
      const params = new URLSearchParams();
      console.log("inside apply filter function:", filters);
      if (filters.status) params.append("status", filters.status);
      if (filters.block) params.append("block", filters.block);
      if (filters.wardNo) params.append("wardNo", filters.wardNo);
      if (filters.dateFrom) params.append("fromDate", filters.dateFrom);
      if (filters.dateTo) params.append("toDate", filters.dateTo);

      const query = params.toString(); // status=PENDING&wardNo=30
      console.log("Calling API with:", query);

      const data = await getGrievanceFilter(query);
      setFilteredData(data);
    } catch (err) {
      console.error("Filter API error:", err);
    }
  };

  const resetFilters = async () => {
    setFilters(initialFilters);
    try {
      const data = await getGrievanceFilter("");
      setFilteredData(data);
    } catch (err) {
      console.error("Reset API error:", err);
    }
  };

  return {
    filters,
    setFilters,
    applyFilters,
    resetFilters,
    filteredData,
  };
};
