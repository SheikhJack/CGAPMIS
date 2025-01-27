"use client";
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProgramList from "@/components/workflows/ProgramList";

interface Program {
  id: number;
  title: string;
  facilitator: string;
  date: string;
  location: string;
  participants: string[];
}

const CapacityBuilding: React.FC = () => {
  // Typing capacityPrograms as Program[] instead of any[]
  const [capacityPrograms, setCapacityPrograms] = useState<Program[]>([]);

  const handleAddProgram = (program: Program) => {
    setCapacityPrograms([...capacityPrograms, program]);
  };

  const handleAddParticipant = (programIndex: number, participant: string) => {
    const updatedPrograms = [...capacityPrograms];
    updatedPrograms[programIndex].participants.push(participant);
    setCapacityPrograms(updatedPrograms);
  };

  return (
    <DefaultLayout>
      <div className="p-6 mb-100">
        <h1 className="text-2xl font-bold mb-6">Capacity Building</h1>
        <ProgramList programs={capacityPrograms} onAddParticipant={handleAddParticipant} />
      </div>
    </DefaultLayout>
  );
};

export default CapacityBuilding;
