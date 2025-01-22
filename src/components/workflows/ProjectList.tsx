"use client";
import React from 'react';

interface ProjectListProps {
  projects: any[];
  onDeleteProject: (index: number) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onDeleteProject }) => {
  return (
    <>
      <h2 className="text-xl font-bold mt-8">Project List</h2>
      {projects.length > 0 ? (
        <table className="table-auto w-full mt-4 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Department</th>
              <th className="p-3 border">Budget</th>
              <th className="p-3 border">Start Date</th>
              <th className="p-3 border">End Date</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td className="p-3 border">{project.title}</td>
                <td className="p-3 border">{project.department}</td>
                <td className="p-3 border">{project.budget}</td>
                <td className="p-3 border">{project.startDate}</td>
                <td className="p-3 border">{project.endDate}</td>
                <td className="p-3 border">{project.status}</td>
                <td className="p-3 border">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => onDeleteProject(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4">No projects added yet.</p>
      )}
    </>
  );
};

export default ProjectList;
