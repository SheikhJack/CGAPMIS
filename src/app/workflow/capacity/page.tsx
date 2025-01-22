"use client"
"use client";
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddProgramForm from "@/app/forms/addProgramForm/page";
import ProgramList from "@/components/workflows/ProgramList";

const CapacityBuilding: React.FC = () => {
  const [capacityPrograms, setCapacityPrograms] = useState<any[]>([]);

  const handleAddProgram = (program: any) => {
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
