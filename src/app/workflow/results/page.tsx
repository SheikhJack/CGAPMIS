"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { ReactNode } from "react";
import useSWR from "swr"; // Importing SWR hook

const fetchCandidates = async () => {
  const response = await fetch("/api/forms/candidacy"); // Update the API endpoint as required
  if (!response.ok) {
    throw new Error("Failed to fetch candidates");
  }
  return response.json();
};

export default function VotingResults() {
  const { data, error } = useSWR("/", fetchCandidates);

  console.log(data)

  return (
    <DefaultLayout>
      {error ? (
        <div className="text-red-500 font-bold text-center">
          Error: {error.message}
        </div>
      ) : !data ? (
        <div className="text-center font-medium">Loading...</div>
      ) : (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Voting Results</h1>

          {/* Voting Results Table */}
          <div className="mt-8">
            <table className="table-auto w-full mt-4 border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Candidate</th>
                  <th className="p-2">Education</th>
                  <th className="p-2">Votes</th>
                </tr>
              </thead>
              <tbody>
                {data.map(
                  (candidate: {
                    experience: ReactNode;
                    contact: ReactNode;
                    education: ReactNode;
                    id: React.Key;
                    name: string;
                    votes: number;
                  }) => (
                    <tr key={candidate.id}>
                      <td className="p-2">{candidate.name}</td>
                      <td className="p-2">{candidate.education}</td>
                      <td className="p-2">{candidate.experience}</td>
                      <td className="p-2">{candidate.contact}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
