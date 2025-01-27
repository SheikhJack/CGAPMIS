"use client";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProjectList from "@/components/workflows/ProjectList";

const OutsourcingProjects: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="p-6 mb-100 pb-20">
        <h1 className="text-2xl font-bold mb-6">Outsourcing Projects</h1>
        <ProjectList onDeleteProject={function (index: number): void {
          throw new Error("Function not implemented.");
        } } /> {/* ProjectList handles its own data fetching */}
      </div>
    </DefaultLayout>
  );
};

export default OutsourcingProjects;
