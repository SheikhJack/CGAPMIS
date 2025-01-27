"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { toast, ToastContainer } from "react-toastify"; // Make sure to install react-toastify

const TenderApplication: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    coverLetter: "",
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!pdfFile) {
      setError("Please upload a PDF file.");
      setLoading(false);
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("contactInfo", formData.contactInfo);
    formDataToSubmit.append("coverLetter", formData.coverLetter);
    formDataToSubmit.append("pdfFile", pdfFile);

    try {
      const response = await fetch("/api/tender/createTender", {
        method: "POST",
        body: formDataToSubmit,
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to apply for the tender.");
      }

      toast.success("Tender submitted successfully!");
      router.push("/workflows/tender-details");
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="mb-40">
        <h1 className="text-2xl font-bold mb-4">Apply for Tender</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="contactInfo" className="block font-medium">Contact Information</label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="coverLetter" className="block font-medium">Cover Letter</label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
              rows={4}
            ></textarea>
          </div>
          <div>
            <label htmlFor="pdf" className="block font-medium">Upload Your PDF</label>
            <input
              type="file"
              id="pdf"
              accept="application/pdf"
              onChange={handleFileChange}
              className=" p-2 w-full rounded"
              required
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </DefaultLayout>
  );
};

export default TenderApplication;
