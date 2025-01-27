"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BoardCandidacyForm() {
  const [formData, setFormData] = useState({
    name: "",
    education: "",
    experience: "",
    contact: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/forms/candidacy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), 
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({ name: "", education: "", experience: "", contact: "" });
        toast.success(data.message || "Your candidacy has been submitted successfully!");
      } else {
        toast.error(data.error || "There was an error submitting your candidacy.");
      }
    } catch (error) {
      toast.error("There was an error submitting your candidacy. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="p-6 mb-40">
        <h1 className="text-2xl font-bold mb-4">Board Membership Candidacy</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-2 w-full px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="education" className="block text-lg font-medium">
              Education
            </label>
            <input
              type="text"
              id="education"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              required
              className="mt-2 w-full px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="experience" className="block text-lg font-medium">
              Experience
            </label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              required
              className="mt-2 w-full px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-lg font-medium">
              Contact Details
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              required
              className="mt-2 w-full px-4 py-2 border rounded"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Candidacy"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </DefaultLayout>
  );
}
