

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

  const handleFileChange = (e) => {
    setForm({ ...form, attachments: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateGrievance(id, form);
    alert("Grievance updated successfully");
    navigate("/dashboard");
  };

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <h2 className="text-white text-lg font-semibold">
            Edit Grievance #{id}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Citizen Details */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Citizen Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Contact Number
              </label>
              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Father / Spouse Name
              </label>
              <input
                name="fatherSpouseName"
                value={form.fatherSpouseName}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Ward No
              </label>
              <input
                name="wardNo"
                value={form.wardNo}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Block</label>
              <input
                name="block"
                value={form.block}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Gram Panchayat
              </label>
              <input
                name="gp"
                value={form.gp}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Village / Sahi
              </label>
              <input
                name="villageSahi"
                value={form.villageSahi}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full Address
              </label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-gray-700 font-semibold mb-3">
              Grievance Topics
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <input
                name="topic1"
                value={form.topic1}
                onChange={handleChange}
                placeholder="Topic 1"
                className="input"
              />
              <input
                name="topic2"
                value={form.topic2}
                onChange={handleChange}
                placeholder="Topic 2"
                className="input"
              />
              <input
                name="topic3"
                value={form.topic3}
                onChange={handleChange}
                placeholder="Topic 3"
                className="input"
              />
              <input
                name="topic4"
                value={form.topic4}
                onChange={handleChange}
                placeholder="Topic 4"
                className="input"
              />
              <input
                name="topic5"
                value={form.topic5}
                onChange={handleChange}
                placeholder="Topic 5"
                className="input"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Grievance Details
            </label>
            <textarea
              name="grievanceDetails"
              value={form.grievanceDetails}
              onChange={handleChange}
              className="input w-full"
              rows="4"
            />
          </div>

          {/* Assignment */}
          <div>
            <h3 className="text-gray-700 font-semibold mb-3">Assignment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Assigned Agent
                </label>
                <input
                  name="agentName"
                  value={form.agentName}
                  className="input bg-gray-100 cursor-not-allowed"
                  disabled 
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Work Given To
                </label>
                <input
                  name="workGivenTo"
                  value={form.workGivenTo}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Status & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="input"
              >
                <option value="PENDING">Pending</option>
                <option value="Reopened">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Admin Date
              </label>
              <input
                type="date"
                name="adminDate"
                value={form.adminDate}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          {/* Remarks */}
          <div>
            <h3 className="text-gray-700 font-semibold mb-2">Remarks</h3>

            <label className="block text-sm text-gray-600 mb-1">
              Agent Remarks
            </label>
            <textarea
              name="agentRemarks"
              value={form.agentRemarks}
              onChange={handleChange}
              className="input w-full mb-3"
              rows="3"
            />

            <label className="block text-sm text-gray-600 mb-1">
              Admin Remarks
            </label>
            <textarea
              name="adminRemarks"
              value={form.adminRemarks}
              onChange={handleChange}
              className="input w-full"
              rows="3"
            />
          </div>

          {/* Attachments */}
          {/* Attachments */}
          <div className="border-t px-6 py-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Attachments
            </h3>

            {form.attachments?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {form.attachments.map((file, index) => (
                  <a
                    key={index}
                    href={file.s3Url || file}
                    target="_blank"
                    rel="noreferrer"
                    className="border rounded-lg overflow-hidden hover:shadow transition"
                  >
                    {file.fileType?.startsWith("image") && (
                      <img
                        src={file.s3Url || file}
                        alt={file.fileName || `Attachment ${index + 1}`}
                        className="w-full h-40 object-cover"
                      />
                    )}
                    <div className="p-2 text-xs">
                      <p className="font-semibold truncate">
                        {file.fileName || `Attachment ${index + 1}`}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Upload New Attachments (Images / PDF)
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        hover:file:bg-blue-100"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Update Grievance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
