"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefaultLayout from "../Layouts/DefaultLayout";

interface Complaint {
    id: number;
    description: string;
    status: string;
    officer: string | null;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ComplaintList: React.FC = () => {
    const { data: complaints, error, mutate } = useSWR<Complaint[]>("/api/forms/complaints", fetcher);
    const [loading, setLoading] = useState(false);

    const assignOfficer = async (id: number) => {
        const officerName = prompt("Enter officer's name:");
        if (!officerName) {
            toast.error("Officer name is required!");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`/api/forms/complaints/${id}/assign`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ officer: officerName }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to assign officer.");
            }

            toast.success("Officer assigned successfully!");
            mutate(); // Refresh complaints
        } catch (error) {
            console.error(error);
            toast.error("Failed to assign officer.");
        } finally {
            setLoading(false);
        }
    };

    const resolveComplaint = async (id: number) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/forms/complaints/${id}/resolve`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to resolve complaint.");
            }

            toast.success("Complaint resolved successfully!");
            mutate(); // Refresh complaints
        } catch (error) {
            console.error(error);
            toast.error("Failed to resolve complaint.");
        } finally {
            setLoading(false);
        }
    };

    if (error) return <p>Error loading complaints.</p>;
    if (!complaints) return <p>Loading...</p>;

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
                                        className={`px-2 py-1 rounded ${complaint.status === "Resolved"
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
                                            onClick={() => assignOfficer(complaint.id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                            disabled={loading}
                                        >
                                            {loading ? "Assigning..." : "Assign Officer"}
                                        </button>
                                    )}
                                    {complaint.status === "In Progress" && (
                                        <button
                                            onClick={() => resolveComplaint(complaint.id)}
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
