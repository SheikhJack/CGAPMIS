"use client";
import React from "react";
import useSWR, { mutate } from "swr";

interface ProjectListProps {
  onDeleteProject: (id: number) => void;
}

// SWR Fetcher Function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProjectList: React.FC<ProjectListProps> = ({ onDeleteProject }) => {
  // Use SWR for fetching projects
  const { data, error, isLoading } = useSWR("/api/forms/outSourcing", fetcher);

  if (isLoading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Failed to load projects.</p>;

  // Extract contracts array from the response
  const projects = data?.contracts || [];

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/forms/outSourcing/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      // Revalidate SWR cache after successful deletion
      mutate("/api/forms/outSourcing");
    } catch (err) {
      console.error(err);
      alert((err as Error).message || "An unknown error occurred");
    }
  };

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
            {projects.map((project: any) => (
              <tr key={project.id}>
                <td className="p-3 border">{project.title}</td>
                <td className="p-3 border">{project.department}</td>
                <td className="p-3 border">{project.budget}</td>
                <td className="p-3 border">{new Date(project.start_date).toLocaleDateString()}</td>
                <td className="p-3 border">{new Date(project.end_date).toLocaleDateString()}</td>
                <td className="p-3 border">{project.status}</td>
                <td className="p-3 border">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4">No projects available.</p>
      )}
    </>
  );
};

export default ProjectList;
