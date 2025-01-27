"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ComplaintForm: React.FC = () => {
  const [newComplaint, setNewComplaint] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComplaint.trim()) {
      setIsSubmitting(true); 
      try {
        const response = await fetch("/api/forms/complaints", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description: newComplaint.trim() }),
        });

        if (response.ok) {
          const result = await response.json();
          toast.success("Complaint logged successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setNewComplaint(""); 
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to log complaint.");
        }
      } catch (error: any) {
        toast.error(error.message || "An unexpected error occurred.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } finally {
        setIsSubmitting(false); 
      }
    } else {
      toast.error("Complaint description cannot be empty!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit} className="space-y-4 mb-100 pb-10">
        <textarea
          className="border p-2 w-full rounded"
          placeholder="Describe the complaint"
          value={newComplaint}
          onChange={(e) => setNewComplaint(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isSubmitting} 
        >
          {isSubmitting ? "Logging..." : "Log Complaint"} 
        </button>
      </form>

      {/* Toast notifications container */}
      <ToastContainer />
    </DefaultLayout>
  );
};

export default ComplaintForm;
