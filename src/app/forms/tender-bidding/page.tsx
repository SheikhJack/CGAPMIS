"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const TenderForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    budget: "",
    criteria: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitted form data:", formData);

    // Redirect to tender listing after successful submission
    router.push("/tender/listing");
  };

  return (
    <DefaultLayout>

      <div>
        <h1 className="text-2xl font-bold mb-4">Create a Tender</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium">Tender Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
              rows={4}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="deadline" className="block font-medium">Deadline</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="budget" className="block font-medium">Budget</label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="criteria" className="block font-medium">Evaluation Criteria</label>
            <textarea
              id="criteria"
              name="criteria"
              value={formData.criteria}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
              rows={4}
              required
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default TenderForm;
