"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProgramForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [facilitator, setFacilitator] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newProgram = {
      title,
      facilitator,
      date,
      location,
    };

    try {
      const res = await fetch("/api/forms/addProgram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProgram),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Program added successfully!", {
          position: "top-right",
        });
        setTitle("");
        setFacilitator("");
        setDate("");
        setLocation("");
      } else {
        toast.error("Failed to add program.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error submitting program:", error);
      toast.error("An error occurred while adding the program.", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Training Program" />
      <form onSubmit={handleSubmit} className="space-y-6 mb-25">
        <div>
          <label htmlFor="title" className="block font-medium mb-2">
            Program Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-3 w-full rounded"
            placeholder="Enter program title"
            required
          />
        </div>
        <div>
          <label htmlFor="facilitator" className="block font-medium mb-2">
            Facilitator
          </label>
          <input
            type="text"
            id="facilitator"
            value={facilitator}
            onChange={(e) => setFacilitator(e.target.value)}
            className="border p-3 w-full rounded"
            placeholder="Enter facilitator's name"
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block font-medium mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-3 w-full rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-3 w-full rounded"
            placeholder="Enter location"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Program"}
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer />
    </DefaultLayout>
  );
};

export default AddProgramForm;
