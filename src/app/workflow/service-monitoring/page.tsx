"use client"
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const ServiceMonitoring: React.FC = () => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [newComplaint, setNewComplaint] = useState("");

  const handleAddComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    const complaint = {
      id: complaints.length + 1,
      description: newComplaint,
      status: "Pending",
      officer: null,
    };
    setComplaints([...complaints, complaint]);
    setNewComplaint("");
  };

  const assignOfficer = (id: number) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, officer: "John Doe", status: "In Progress" } : complaint
    );
    setComplaints(updatedComplaints);
  };

  const resolveComplaint = (id: number) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, status: "Resolved" } : complaint
    );
    setComplaints(updatedComplaints);
  };

  return (
    <DefaultLayout>
      <div className="p-6 mb-100">
        <h1 className="text-2xl font-bold mb-4">Log Complaint</h1>

        {/* Complaint Logging */}
        <form onSubmit={handleAddComplaint} className="space-y-4">
          <textarea
            className="border p-2 w-full rounded"
            placeholder="Describe the complaint"
            value={newComplaint}
            onChange={(e) => setNewComplaint(e.target.value)}
            required
          ></textarea>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Log Complaint</button>
        </form>

        {/* Complaint List */}
        <h2 className="text-xl font-bold mt-6">Logged Complaints</h2>
        {complaints.length > 0 ? (
          <ul className="mt-4">
            {complaints.map((complaint) => (
              <li key={complaint.id} className="border p-4 rounded mb-4">
                <p><strong>ID:</strong> {complaint.id}</p>
                <p><strong>Description:</strong> {complaint.description}</p>
                <p><strong>Status:</strong> {complaint.status}</p>
                <p><strong>Assigned Officer:</strong> {complaint.officer || "Not Assigned"}</p>
                <div className="flex gap-2 mt-2">
                  {!complaint.officer && (
                    <button
                      onClick={() => assignOfficer(complaint.id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Assign Officer
                    </button>
                  )}
                  {complaint.status === "In Progress" && (
                    <button
                      onClick={() => resolveComplaint(complaint.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Resolve Complaint
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
    </DefaultLayout>
  );
};

export default ServiceMonitoring;
