"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { ReactNode } from "react";
import useSWR from "swr";
import jsPDF from "jspdf";


const fetchComplaints = async () => {
    const response = await fetch("/api/reports/complaints");
    if (!response.ok) {
        throw new Error("Failed to fetch complaints");
    }
    return response.json();
};

export default function ResolvedComplaintsPage() {
  const { data, error } = useSWR("/api/reports/complaints", fetchComplaints);

  console.log(data)

const handleDownloadPDF = () => {
    if (!data) return;

    const pdf = new jsPDF();

    // Add title to the PDF
    pdf.setFontSize(16);
    pdf.text("Resolved Complaints Report", 10, 10);

    // Add table headers
    pdf.setFontSize(12);
    pdf.text("ID", 10, 20);
    pdf.text("Description", 30, 20);
    pdf.text("Officer", 120, 20);
    pdf.text("Date", 160, 20);

    // Add complaints data
    data.forEach((complaint: { id: number; description: string; officer: string; created_at: string }, index: number) => {
        const yPosition = 30 + index * 10;
        pdf.text(`${complaint.id}`, 10, yPosition);
        pdf.text(`${complaint.description.substring(0, 50)}...`, 30, yPosition); // Truncate long descriptions
        pdf.text(`${complaint.officer}`, 120, yPosition);
        pdf.text(new Date(complaint.created_at).toLocaleDateString(), 160, yPosition);
    });

    // Save the PDF
    pdf.save("Resolved_Complaints_Report.pdf");
};


return (
    <DefaultLayout>
        <div className="p-6 mb-100 pb-20">
            <h1 className="text-2xl font-bold mb-4">Resolved Complaints</h1>

            {error ? (
                <div className="text-red-500 font-bold">Error: {error.message}</div>
            ) : !data ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="overflow-x-auto mb-4">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 p-2">Complaint ID</th>
                                    <th className="border border-gray-300 p-2">escription</th>
                                    <th className="border border-gray-300 p-2">Officer Assigned</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(
                                    (complaint: {
                                        description: ReactNode;
                                        officer: ReactNode; id: string; title: string; resolution: string 
}) => (
                                        <tr key={complaint.id}>
                                            <td className="border border-gray-300 p-2">{complaint.id}</td>
                                            <td className="border border-gray-300 p-2">{complaint.description}</td>
                                            <td className="border border-gray-300 p-2">{complaint.officer}</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                    <button
                        onClick={handleDownloadPDF}
                        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                    >
                        Download PDF
                    </button>
                </>
            )}
        </div>
    </DefaultLayout>
);
}
