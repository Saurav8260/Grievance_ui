import { useState } from "react";
import { getGrievanceFilter } from "../api/userService";

const initialFilters = {
  status: "",
  block: "",
  ward: "",
  date: "",   
  name: "",
  fatherSpouseName: "",
  gp: "",
  villageSahi: "",
  Remark: "",
  topic: "",
  dateFrom: "",
  dateTo: "",
};
export const useTableFilter = (baseData = []) => {
  const [filters, setFilters] = useState(initialFilters);
  const [filteredData, setFilteredData] = useState(baseData);
  const [isFiltered, setIsFiltered] = useState(false);

const applyFilters = async () => {
  try {
    setIsFiltered(true);

    const params = new URLSearchParams();
    if (filters.status) params.append("status", filters.status);
    if (filters.block) params.append("block", filters.block);
    if (filters.ward) params.append("wardNo", filters.ward);
    if (filters.dateFrom) params.append("date", filters.dateFrom); 
    if (filters.dateTo) params.append("dateTo", filters.dateTo);
    if (filters.name) params.append("name", filters.name);
    if (filters.fatherSpouseName) params.append("fatherSpouseName", filters.fatherSpouseName);
    if (filters.gp) params.append("gp", filters.gp);
    if (filters.villageSahi) params.append("villageSahi", filters.villageSahi);
    if (filters.Remark) params.append("agentRemarks", filters.Remark);
    if (filters.topic) params.append("topic", filters.topic);



    const data = await getGrievanceFilter(params.toString());
    


      const mapped = data.map((g) => ({
        id: g.grievanceId,
        name: g.name,
        subName: g.contact,
        fatherSpouseName: g.fatherSpouseName,
        gp: g.gp,
        villageSahi: g.villageSahi,
        wardNo: g.wardNo,
        Remarks: g.agentRemarks,
        location: g.address,
        topic: g.topic1,
        block: g.block,
        "date to": g.createdAt,
        "date from": g.createdAt,
        status: g.status,
        agent: g.agentName || "Unassigned",
      }));

      setFilteredData(mapped);
    } catch (err) {
      console.error("Filter API error:", err);
    }
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setIsFiltered(false);
    setFilteredData(baseData);
  };

  return {
    filters,
    setFilters,
    applyFilters,
    resetFilters,
    filteredData: isFiltered ? filteredData : baseData,
  };
};

