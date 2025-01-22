"use client";
import React, { useEffect, useState } from "react";

interface Program {
  id: number; // Unique identifier
  title: string;
  facilitator: string;
  date: string;
  location: string;
  participants: string[]; // Modify if participants are part of the database schema
}

const ProgramList: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch programs from the server
    const fetchPrograms = async () => {
      try {
        const response = await fetch("/api/forms/addProgram");
        if (!response.ok) {
          throw new Error("Failed to fetch programs");
        }
        const result = await response.json();
        setPrograms(result.data || [])
        console.log('programs', result)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();

  }, []);

  console.log('data', programs)


  const handleAddParticipant = async (programId: number, participant: string) => {
    try {
      const response = await fetch(`/api/forms/addPrograms/${programId}/addParticipant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ participant }),
      });

      if (!response.ok) {
        throw new Error("Failed to add participant");
      }

      // Update UI after successful addition
      setPrograms((prev) =>
        prev.map((program) =>
          program.id === programId
            ? { ...program, participants: [...program.participants, participant] }
            : program
        )
      );
    } catch (err) {
      console.error(err);
      setError("Could not add participant");
    }
  };

  if (loading) return <p>Loading programs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mt-8">Programs</h2>
      {programs.length > 0 ? (
        <div className="mt-4">
          {programs.map((program) => (
            <div key={program.id} className="border rounded p-4 mb-4">
              <h3 className="text-lg font-bold">{program.title}</h3>
              <p>Facilitator: {program.facilitator}</p>
              <p>Date: {new Date(program.date).toLocaleDateString()}</p>
              <p>Location: {program.location}</p>
              <h4 className="font-semibold mt-2">Participants:</h4>
              <ul className="list-disc ml-6">
                {program.participants.map((participant, pIndex) => (
                  <li key={pIndex}>{participant}</li>
                ))}
              </ul>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Add Participant"
                  className="border p-2 rounded"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value.trim()) {
                      handleAddParticipant(program.id, e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4">No programs added yet.</p>
      )}
    </div>
  );
};

export default ProgramList;
