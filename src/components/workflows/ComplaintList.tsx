"use client";

import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Complaint {
  id: number;
  description: string;
  status: string;
  officer: string | null;
}

interface ComplaintListProps {
  complaints: Complaint[];
  onAssignOfficer: (id: number) => void;
  onResolveComplaint: (id: number) => void;
  loading: boolean;
}

const ComplaintList: React.FC<ComplaintListProps> = ({
  complaints,
  onAssignOfficer,
  onResolveComplaint,
  loading,
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Logged Complaints</h2>
      <ToastContainer />
      {complaints.length > 0 ? (
        <ul className="space-y-4">
          {complaints.map((complaint) => (
            <li key={complaint.id} className="border p-4 rounded shadow">
              <p>
                <strong>ID:</strong> {complaint.id}
              </p>
              <p>
                <strong>Description:</strong> {complaint.description}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded ${
                    complaint.status === "Resolved"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {complaint.status}
                </span>
              </p>
              <p>
                <strong>Assigned Officer:</strong>{" "}
                {complaint.officer || "Not Assigned"}
              </p>
              <div className="flex gap-2 mt-2">
                {!complaint.officer && (
                  <button
                    onClick={() => onAssignOfficer(complaint.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={loading}
                  >
                    {loading ? "Assigning..." : "Assign Officer"}
                  </button>
                )}
                {complaint.status === "In Progress" && (
                  <button
                    onClick={() => onResolveComplaint(complaint.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    disabled={loading}
                  >
                    {loading ? "Resolving..." : "Resolve Complaint"}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No complaints logged yet.</p>
      )}
    </div>
  );
};

export default ComplaintList;
