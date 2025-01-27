"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState, useEffect } from "react";
import useSWR from "swr";

// Fetch candidates from the backend
const fetchCandidates = async () => {
  const response = await fetch("/api/forms/candidacy");
  if (!response.ok) {
    throw new Error("Failed to fetch candidates");
  }
  return response.json();
};

export default function BoardSelection() {
  const { data: candidates, error, mutate } = useSWR("/api/forms/candidacy", fetchCandidates);

  const [votedCandidateIds, setVotedCandidateIds] = useState<number[]>([]); 
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    // Check for existing votes (optional)
    const fetchVotes = async () => {
      try {
        const response = await fetch("/api/votes"); // Adjust API endpoint for fetching votes
        if (!response.ok) {
          throw new Error("Failed to fetch votes");
        }
        const data = await response.json();
        setVotedCandidateIds(data.map((vote) => vote.candidateId)); 
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };
    fetchVotes();
  }, []);

  const handleVote = async (candidateId: number) => {
    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ candidateId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit vote: ${response.statusText}`);
      }

      setVotedCandidateIds([...votedCandidateIds, candidateId]);
      setFeedback(`You have successfully voted for candidate ${candidateId}`);
      mutate(); // Update candidates list (optional)
    } catch (error: any) {
      setFeedback(`Error: ${error.message}`);
    }
  };

  const handleRemove = async (id: number) => {
    try {
      const response = await fetch(`/api/forms/candidacy/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to remove candidate: ${response.statusText}`);
      }

      mutate(candidates.filter((candidate) => candidate.id !== id), false);
      setFeedback("Candidate removed successfully!");
    } catch (error: any) {
      setFeedback(`Error: ${error.message}`);
    }
  };

  // Error handling for failed fetching
  if (error) return <div>Error: {error.message}</div>;
  if (!candidates) return <div>Loading...</div>;

  return (
    <DefaultLayout>
      <div className="p-6 mb-40">
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
                <p>{candidate.education}</p>
                <p>{candidate.experience}</p>
                <p>{candidate.contact}</p>
              </div>
              <div className="flex items-center gap-4">
                {votedCandidateIds.includes(candidate.id) ? (
                  <span className="text-green-500 font-medium">Voted</span>
                ) : (
                  <button
                    onClick={() => handleVote(candidate.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Vote
                  </button>
                )}
                <button
                  onClick={() => handleRemove(candidate.id)}
                  className="text-red-500 ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback */}
        {feedback && (
          <p className="mt-4 text-green-500 font-medium">{feedback}</p>
        )}
      </div>
    </DefaultLayout>
  );
}