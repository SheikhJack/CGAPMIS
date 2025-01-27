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

interface ProgramListProps {
  programs: Program[]; // Accepting Program[] as props
  onAddParticipant: (programIndex: number, participant: string) => void;
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

const ProgramList: React.FC<ProgramListProps> = ({ programs, onAddParticipant }) => {
  if (!programs || programs.length === 0) return <p>No programs added yet.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mt-8">Programs</h2>
      <div className="mt-4">
        {programs.map((program, index) => (
          <div key={program.id} className="border rounded p-4 mb-4">
            <h3 className="text-lg font-bold">{program.title}</h3>
            <p>Facilitator: {program.facilitator}</p>
            <p>Date: {new Date(program.date).toLocaleDateString()}</p>
            <p>Location: {program.location}</p>
            <h4 className="font-semibold mt-2">Participants:</h4>
            <ul className="list-disc ml-6">
              {program.participants?.length ? (
                program.participants.map((participant, idx) => <li key={idx}>{participant}</li>)
              ) : (
                <p>No participants yet.</p>
              )}
            </ul>
            <button
              onClick={() => onAddParticipant(index, "New Participant")}
              className="mt-2 bg-blue-500 text-white p-2 rounded"
            >
              Add Participant
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramList;
