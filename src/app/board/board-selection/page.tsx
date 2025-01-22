"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";

export default function BoardSelection() {
  const [candidates, setCandidates] = useState([
    { id: 1, name: "John Doe", qualifications: "MBA, 10+ years in Management", votes: 0 },
    { id: 2, name: "Jane Smith", qualifications: "PhD in Economics, 8+ years in Policy Making", votes: 0 },
    { id: 3, name: "Samuel Green", qualifications: "LLB, 15+ years in Legal Advisory", votes: 0 },
  ]);

  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  const handleVote = () => {
    if (selectedCandidate === null) {
      setFeedback("Please select a candidate to vote.");
      return;
    }

    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === selectedCandidate
        ? { ...candidate, votes: candidate.votes + 1 }
        : candidate
    );

    setCandidates(updatedCandidates);
    setFeedback("Your vote has been successfully submitted!");
    setSelectedCandidate(null);
  };

  return (
    <DefaultLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Board Selection</h1>

        {/* Candidate List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Nominees</h2>
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="flex items-center justify-between border p-4 rounded"
            >
              <div>
                <h3 className="text-lg font-bold">{candidate.name}</h3>
                <p>{candidate.qualifications}</p>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  id={`candidate-${candidate.id}`}
                  name="candidate"
                  value={candidate.id}
                  checked={selectedCandidate === candidate.id}
                  onChange={() => setSelectedCandidate(candidate.id)}
                />
                <label htmlFor={`candidate-${candidate.id}`} className="font-medium">
                  Select
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Vote Button */}
        <div className="mt-6">
          <button
            onClick={handleVote}
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Submit Vote
          </button>
        </div>

        {/* Feedback */}
        {feedback && (
          <p className="mt-4 text-green-500 font-medium">{feedback}</p>
        )}

        {/* Voting Results */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Voting Results</h2>
          <table className="table-auto w-full mt-4 border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Candidate</th>
                <th className="p-2">Votes</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
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

