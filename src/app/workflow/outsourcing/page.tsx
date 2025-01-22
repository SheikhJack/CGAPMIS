"use client";
import React, { useState } from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import ProjectList from '@/components/workflows/ProjectList';

const OutsourcingProjects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);

  const handleAddProject = (project: any) => {
    setProjects([...projects, project]);
  };

  const handleDeleteProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <DefaultLayout>
      <div className="p-6 mb-100">
        <h1 className="text-2xl font-bold mb-6">Outsourcing Projects</h1>
        {/* List Component */}
        <ProjectList projects={projects} onDeleteProject={handleDeleteProject} />
      </div>
    </DefaultLayout>
  );
};

export default OutsourcingProjects;
