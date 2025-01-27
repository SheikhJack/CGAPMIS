"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import useSWR from "swr";  // Importing SWR hook
import { useRouter } from "next/router";

const fetchCandidates = async () => {
  const response = await fetch(""); 
  if (!response.ok) {
    throw new Error("Failed to fetch candidates");
  }
  return response.json();
};

export default function VotingResults() {
  const { data, error } = useSWR("/", fetchCandidates); 

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <DefaultLayout>
      <div className="p-6 mb-100">
        <h1 className="text-2xl font-bold mb-4">Voting Results</h1>

        {/* Voting Results Table */}
        <div className="mt-8">
          <table className="table-auto w-full mt-4 border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Candidate</th>
                <th className="p-2">Votes</th>
              </tr>
            </thead>
            <tbody>
              {data.map((candidate: { id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; votes: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                <tr key={candidate.id}>
                  <td className="p-2">{candidate.name}</td>
                  <td className="p-2">{candidate.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
}
