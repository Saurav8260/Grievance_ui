import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGrievanceById } from "../api/userService";

export default function GrievanceDetails() {
  const { id } = useParams();
  const [grievance, setGrievance] = useState(null);

  useEffect(() => {
    getGrievanceById(id).then(setGrievance);
  }, [id]);

  if (!grievance) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading grievance details...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <h2 className="text-white text-lg font-semibold">Grievance Details</h2>
        </div>

        {/* Main Info */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

          <div>
            <p className="text-gray-500">Citizen Name</p>
            <p className="font-semibold">{grievance.name}</p>
          </div>

          <div>
            <p className="text-gray-500">Contact Number</p>
            <p className="font-semibold">{grievance.contact}</p>
          </div>

          <div>
            <p className="text-gray-500">Father / Spouse Name</p>
            <p className="font-semibold">{grievance.fatherSpouseName}</p>
          </div>

          <div>
            <p className="text-gray-500">Block</p>
            <p className="font-semibold">{grievance.block}</p>
          </div>

          <div>
            <p className="text-gray-500">GP</p>
            <p className="font-semibold">{grievance.gp}</p>
          </div>

          <div>
            <p className="text-gray-500">Village / Sahi</p>
            <p className="font-semibold">{grievance.villageSahi}</p>
          </div>

          <div>
            <p className="text-gray-500">Ward No</p>
            <p className="font-semibold">{grievance.wardNo}</p>
          </div>

          <div>
            <p className="text-gray-500">Full Address</p>
            <p className="font-semibold">{grievance.address}</p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
              {grievance.status}
            </span>
          </div>

          <div>
            <p className="text-gray-500">Work Given To</p>
            <p className="font-semibold">{grievance.workGivenTo}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-gray-500">Topics</p>
            <p className="font-medium">
              {grievance.topic1}, {grievance.topic2}, {grievance.topic3},{" "}
              {grievance.topic4}, {grievance.topic5}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-gray-500">Grievance Details</p>
            <p className="font-medium text-gray-800">
              {grievance.grievanceDetails}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Created At</p>
            <p className="font-medium">
              {new Date(grievance.createdAt).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Last Updated</p>
            <p className="font-medium">
              {new Date(grievance.updatedAt).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Agent Name</p>
            <p className="font-semibold">{grievance.agentName}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-gray-500">Agent Remarks</p>
            <p className="font-medium">{grievance.agentRemarks}</p>
          </div>

          <div>
            <p className="text-gray-500">Admin Date</p>
            <p className="font-medium">{grievance.adminDate}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-gray-500">Admin Remarks</p>
            <p className="font-medium">{grievance.adminRemarks}</p>
          </div>

        </div>

        {/* Collected By */}
        <div className="border-t px-6 py-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Collected / Assigned By
          </h3>

          {grievance.collectedBy ? (
            <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-semibold">{grievance.collectedBy.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Contact</p>
                <p className="font-semibold">{grievance.collectedBy.contact}</p>
              </div>
              <div>
                <p className="text-gray-500">Role</p>
                <p className="font-semibold">{grievance.collectedBy.role}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No agent assigned</p>
          )}
        </div>

        {/* Attachments */}
        <div className="border-t px-6 py-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Attachments
          </h3>

          {grievance.attachments?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {grievance.attachments.map((file) => (
                <a
                  key={file.attachmentId}
                  href={file.s3Url}
                  target="_blank"
                  rel="noreferrer"
                  className="border rounded-lg overflow-hidden hover:shadow transition"
                >
                  {file.fileType.startsWith("image") && (
                    <img
                      src={file.s3Url}
                      alt={file.fileName}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-2 text-xs">
                    <p className="font-semibold truncate">{file.fileName}</p>
                    <p className="text-gray-500">
                      {(file.fileSize / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No attachments available</p>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-3 text-right text-xs text-gray-500">
          Last updated automatically from central grievance system
        </div>

        
      </div>
    </div>
  );
}
