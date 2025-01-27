"use client";
import useSWR from "swr";
import React from "react";

interface Program {
  id: number;
  title: string;
  facilitator: string;
  date: string;
  location: string;
  participants?: string[];
}

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => data.programs); // Extract `programs` directly for simplicity

const ProgramList: React.FC = () => {
  const { data: programs, error, isLoading } = useSWR<Program[]>("/api/forms/addProgram", fetcher);

  // Debug logs
  console.log("Programs:", programs);

  if (error) return <p className="text-red-500">Failed to load programs.</p>;
  if (isLoading) return <p>Loading programs...</p>;
  if (!programs || programs.length === 0) return <p>No programs added yet.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mt-8">Programs</h2>
      <div className="mt-4">
        {programs.map((program) => (
          <div key={program.id} className="border rounded p-4 mb-4">
            <h3 className="text-lg font-bold">{program.title}</h3>
            <p>Facilitator: {program.facilitator}</p>
            <p>Date: {new Date(program.date).toLocaleDateString()}</p>
            <p>Location: {program.location}</p>
            <h4 className="font-semibold mt-2">Participants:</h4>
            <ul className="list-disc ml-6">
              {program.participants?.length ? (
                program.participants.map((participant, index) => <li key={index}>{participant}</li>)
              ) : (
                <p>No participants yet.</p>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramList;
