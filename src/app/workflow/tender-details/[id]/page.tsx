"use client";

import React from "react";
import { useParams } from "next/navigation";

const TenderDetails: React.FC = () => {
  const params = useParams();
  const { id } = params;

  const mockTender = {
    id,
    title: "Road Construction",
    description: "Construction of a 100km road between City A and City B.",
    deadline: "2025-12-31",
    budget: "5000000",
    criteria: "Experience in similar projects, financial stability, and technical capability.",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{mockTender.title}</h1>
      <p><strong>Description:</strong> {mockTender.description}</p>
      <p><strong>Deadline:</strong> {mockTender.deadline}</p>
      <p><strong>Budget:</strong> {mockTender.budget}</p>
      <p><strong>Evaluation Criteria:</strong> {mockTender.criteria}</p>
    </div>
  );
};

export default TenderDetails;
