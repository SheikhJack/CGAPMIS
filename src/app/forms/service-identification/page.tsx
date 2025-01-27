"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ServiceForm: React.FC = () => {
  const [serviceName, setServiceName] = useState("");
  const [department, setDepartment] = useState("");
  const [annualCost, setAnnualCost] = useState("");
  const [outsourcingCost, setOutsourcingCost] = useState("");
  const [reasons, setReasons] = useState("");
  const [impact, setImpact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newService = {
      name: serviceName,
      department,
      annualCost,
      outsourcingCost,
      reasons,
      impact,
      status: "Draft",
    };

    try {
      const response = await fetch("/api/forms/service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      });

      if (response.ok) {
        toast.success("Service added successfully!");
        // Clear the form
        setServiceName("");
        setDepartment("");
        setAnnualCost("");
        setOutsourcingCost("");
        setReasons("");
        setImpact("");
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.error || "Failed to add service."}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DefaultLayout>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="serviceName" className="block font-medium mb-2">
            Service Name
          </label>
          <input
            type="text"
            id="serviceName"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="border p-3 w-full rounded"
            placeholder="Enter service name"
            required
          />
        </div>
        <div>
          <label htmlFor="department" className="block font-medium mb-2">
            Department/Ministry
          </label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border p-3 w-full rounded"
            placeholder="Enter department or ministry"
            required
          />
        </div>
        <div>
          <label htmlFor="annualCost" className="block font-medium mb-2">
            Current Annual Cost
          </label>
          <input
            type="number"
            id="annualCost"
            value={annualCost}
            onChange={(e) => setAnnualCost(e.target.value)}
            className="border p-3 w-full rounded"
            placeholder="Enter current annual cost"
            required
          />
        </div>
        <div>
          <label htmlFor="outsourcingCost" className="block font-medium mb-2">
            Estimated Outsourcing Cost
          </label>
          <input
            type="number"
            id="outsourcingCost"
            value={outsourcingCost}
            onChange={(e) => setOutsourcingCost(e.target.value)}
            className="border p-3 w-full rounded"
            placeholder="Enter estimated outsourcing cost"
            required
          />
        </div>
        <div>
          <label htmlFor="reasons" className="block font-medium mb-2">
            Reasons for Outsourcing
          </label>
          <textarea
            id="reasons"
            value={reasons}
            onChange={(e) => setReasons(e.target.value)}
            className="border p-3 w-full rounded"
            rows={4}
            placeholder="Provide reasons for outsourcing"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="impact" className="block font-medium mb-2">
            Service Impact Assessment
          </label>
          <textarea
            id="impact"
            value={impact}
            onChange={(e) => setImpact(e.target.value)}
            className="border p-3 w-full rounded"
            rows={4}
            placeholder="Describe the potential impact"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </DefaultLayout>
  );
};

export default ServiceForm;
