import React, { useState } from "react";
import { createGrievance } from "../api/userService";
import locationMaster from "../data/locationMaster.js";

export default function AddGrievanceModal({ onClose, onSuccess }) {
  const loggedInName = localStorage.getItem("dashboard_name") || "";

  const [form, setForm] = useState({
    name: "",
    fatherSpouseName: "",
    contact: "",
    block: "",
    gp: "",
    villageSahi: "",
    wardNo: "",
    address: "",
    topics: [""],
    grievanceDetails: "",
    remark: "",
    createddate: new Date().toISOString().split("T")[0],
    collectedBy: loggedInName,
    attachment: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const blocks = Object.keys(locationMaster);
  const gps = form.block ? Object.keys(locationMaster[form.block]) : [];
  const villages = form.gp ? Object.keys(locationMaster[form.block][form.gp]) : [];
  const wards = form.villageSahi
    ? locationMaster[form.block][form.gp][form.villageSahi]
    : [];

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "attachment") {
      setForm({ ...form, attachment: files[0] });
    } else if (name === "block") {
      setForm({ ...form, block: value, gp: "", villageSahi: "", wardNo: "" });
    } else if (name === "gp") {
      setForm({ ...form, gp: value, villageSahi: "", wardNo: "" });
    } else if (name === "villageSahi") {
      setForm({ ...form, villageSahi: value, wardNo: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addTopic = () => {
    setForm({ ...form, topics: [...form.topics, ""] });
  };

  const removeTopic = (index) => {
    const newTopics = form.topics.filter((_, i) => i !== index);
    setForm({ ...form, topics: newTopics });
  };

  const handleTopicChange = (index, value) => {
    const newTopics = [...form.topics];
    newTopics[index] = value;
    setForm({ ...form, topics: newTopics });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        name: form.name,
        fatherSpouseName: form.fatherSpouseName,
        contact: form.contact,
        block: form.block,
        gp: form.gp,
        villageSahi: form.villageSahi,
        wardNo: form.wardNo,
        address: form.address,

        topic1: form.topics[0] || "",
        topic2: form.topics[1] || "",
        topic3: form.topics[2] || "",
        topic4: form.topics[3] || "",
        topic5: form.topics[4] || "",

        grievanceDetails: form.grievanceDetails,
        remark: form.remark,
        date: form.createddate,
        collectedBy: form.collectedBy,
      };

      await createGrievance(payload);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save grievance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[450px] max-h-[90vh] rounded-xl p-6 overflow-y-auto">
        <h2 className="text-lg font-semibold text-center mb-4 text-white bg-blue-700 py-2 rounded-lg">
          Create New Grievance
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-2 text-sm rounded mb-3 text-center">
            {error}
          </div>
        )}

        <Select label="Block" name="block" value={form.block} options={blocks} onChange={handleChange} />
        <Select label="GP" name="gp" value={form.gp} options={gps} onChange={handleChange} disabled={!form.block} />
        <Select label="Village / Sahi" name="villageSahi" value={form.villageSahi} options={villages} onChange={handleChange} disabled={!form.gp} />
        <Select label="Ward No" name="wardNo" value={form.wardNo} options={wards} onChange={handleChange} disabled={!form.villageSahi} />

        <Input label="Address" name="address" value={form.address} onChange={handleChange} />
        <Input label="Citizen Name" name="name" value={form.name} onChange={handleChange} />
        <Input label="Father / Spouse" name="fatherSpouseName" value={form.fatherSpouseName} onChange={handleChange} />
        <Input label="Contact" name="contact" value={form.contact} onChange={handleChange} />

        {/* Dynamic Topics */}
        <div className="mb-2">
          <label className="text-xs text-gray-600">Topics</label>

          {form.topics.map((topic, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                value={topic}
                onChange={(e) => handleTopicChange(index, e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm"
                placeholder={`Topic ${index + 1}`}
              />

              {form.topics.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTopic(index)}
                  className="px-3 bg-red-500 text-white rounded"
                >
                  −
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addTopic}
            className="text-sm text-blue-600 font-semibold"
          >
            + Add another topic
          </button>
        </div>

        <Input label="Grievance Details" name="grievanceDetails" value={form.grievanceDetails} onChange={handleChange} />
        <Input label="Remark" name="remark" value={form.remark} onChange={handleChange} />

        {/* Auto-filled Collected By */}
        <Input
          label="Collected By"
          name="collectedBy"
          value={form.collectedBy}
          readOnly
        />

        <div>
          <label className="text-xs text-gray-600">Attachment</label>
          <input
            type="file"
            name="attachment"
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="px-4 py-2 border rounded-md">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, readOnly }) {
  return (
    <div className="mb-2">
      <label className="text-xs text-gray-600">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className="w-full border rounded-md px-3 py-2 text-sm"
      />
    </div>
  );
}

function Select({ label, name, value, options, onChange, disabled }) {
  return (
    <div className="mb-2">
      <label className="text-xs text-gray-600">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full border rounded-md px-3 py-2 text-sm"
      >
        <option value="">Select {label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
