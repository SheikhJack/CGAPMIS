"use client";

import React, { useState } from "react";
import useSWR from "swr";
import ComplaintList from "@/components/workflows/ComplaintList";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

interface Complaint {
  id: number;
  description: string;
  status: string;
  officer: string | null;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ComplaintsPage: React.FC = () => {
  const { data: complaints, error, mutate } = useSWR<Complaint[]>(
    "/api/forms/complaints",
    fetcher
  );
  const [loading, setLoading] = useState(false);

  // Assign Officer to a Complaint
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

  // Resolve a Complaint
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
    <DefaultLayout>
      <div className="p-6 mb-100">
        <h1 className="text-2xl font-bold mb-6">Complaints Dashboard</h1>
        <ComplaintList
          complaints={complaints}
          onAssignOfficer={assignOfficer}
          onResolveComplaint={resolveComplaint}
          loading={loading}
        />
        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default ComplaintsPage;
