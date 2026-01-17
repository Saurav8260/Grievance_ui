import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGrievanceById, updateGrievance } from "../api/userService";

export default function EditGrievance() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    block: "",
    gp: "",
    villageSahi: "",
    address: "",
    wardNo: "",
    name: "",
    fatherSpouseName: "",
    contact: "",
    topic1: "",
    topic2: "",
    topic3: "",
    topic4: "",
    topic5: "",
    grievanceDetails: "",
    agentRemarks: "",
    agentName: "",
    workGivenTo: "",
    status: "",
    adminDate: "",
    adminRemarks: "",
    attachments: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGrievanceById(id).then((data) => {
      setForm(data);
      setLoading(false);
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateGrievance(id, form);
    alert("Grievance updated successfully");
    navigate("/dashboard");
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <h2 className="text-white text-lg font-semibold">Edit Grievance #{id}</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Citizen Details */}
          <div>
            <h3 className="text-gray-700 font-semibold mb-3">Citizen Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Citizen Name" className="input" />
              <input name="fatherSpouseName" value={form.fatherSpouseName} onChange={handleChange} placeholder="Father / Spouse Name" className="input" />
              <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact Number" className="input" />
              <input name="wardNo" value={form.wardNo} onChange={handleChange} placeholder="Ward No" className="input" />
              <input name="block" value={form.block} onChange={handleChange} placeholder="Block" className="input" />
              <input name="gp" value={form.gp} onChange={handleChange} placeholder="GP" className="input" />
              <input name="villageSahi" value={form.villageSahi} onChange={handleChange} placeholder="Village / Sahi" className="input" />
              <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="input" />
            </div>
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-gray-700 font-semibold mb-3">Grievance Topics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input name="topic1" value={form.topic1} onChange={handleChange} placeholder="Topic 1" className="input" />
              <input name="topic2" value={form.topic2} onChange={handleChange} placeholder="Topic 2" className="input" />
              <input name="topic3" value={form.topic3} onChange={handleChange} placeholder="Topic 3" className="input" />
              <input name="topic4" value={form.topic4} onChange={handleChange} placeholder="Topic 4" className="input" />
              <input name="topic5" value={form.topic5} onChange={handleChange} placeholder="Topic 5" className="input" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-700 font-semibold">Grievance Description</label>
            <textarea name="grievanceDetails" value={form.grievanceDetails} onChange={handleChange} className="input mt-2 w-full" rows="4" />
          </div>

          {/* Assignment */}
          <div>
            <h3 className="text-gray-700 font-semibold mb-3">Assignment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="agentName" value={form.agentName} onChange={handleChange} placeholder="Assigned Agent" className="input" />
              <input name="workGivenTo" value={form.workGivenTo} onChange={handleChange} placeholder="Department" className="input" />
            </div>
          </div>

          {/* Status & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="status" value={form.status} onChange={handleChange} className="input">
              <option value="PENDING">Pending</option>
              <option value="Reopened">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="REJECTED">Rejected</option>
            </select>

            <input type="date" name="adminDate" value={form.adminDate} onChange={handleChange} className="input" />
          </div>

          {/* Remarks */}
          <div>
            <h3 className="text-gray-700 font-semibold mb-2">Remarks</h3>
            <textarea name="agentRemarks" value={form.agentRemarks} onChange={handleChange} placeholder="Agent Remarks" className="input w-full mb-3" rows="3" />
            <textarea name="adminRemarks" value={form.adminRemarks} onChange={handleChange} placeholder="Admin Remarks" className="input w-full" rows="3" />
          </div>

          {/* Attachments */}
         <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Attachments (File URL / Name)</label>
            <input
              name="attachments"
              value={form.attachments}
              onChange={handleChange}
              placeholder="Upload file or paste link"
              className="input w-full"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
              Update Grievance
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
