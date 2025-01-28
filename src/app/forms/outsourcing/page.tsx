"use client";
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProjectFormProps {
  onAddProject: (project: any) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onAddProject }) => {
  const [projectTitle, setProjectTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('Planned');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (+budget <= 0) {
      toast.error('Budget must be greater than zero.');
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      toast.error('End date must be later than start date.');
      return;
    }

    const newProject = {
      title: projectTitle,
      department,
      budget,
      startDate,
      endDate,
      status,
    };

    setSubmitting(true); // Start submitting state
    try {
      const response = await fetch('/api/forms/outSourcing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        throw new Error('Failed to add the project. Please try again.');
      }

      const result = await response.json();
      toast.success('Project added successfully!');
      onAddProject(result);

      // Clear form
      setProjectTitle('');
      setDepartment('');
      setBudget('');
      setStartDate('');
      setEndDate('');
      setStatus('Planned');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred.');
    } finally {
      setSubmitting(false); // End submitting state
    }
  };

  return (
    <DefaultLayout>
      <ToastContainer />
      <Breadcrumb pageName="Outsourcing" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="projectTitle" className="block font-medium mb-2">Project Title</label>
          <input
            type="text"
            id="projectTitle"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="border p-3 w-full rounded"
            placeholder="Enter project title"
            required
          />
        </div>
        <div>
          <label htmlFor="department" className="block font-medium mb-2">Department</label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border p-3 w-full rounded"
            placeholder="Enter department"
            required
          />
        </div>
        <div>
          <label htmlFor="budget" className="block font-medium mb-2">Budget</label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="border p-3 w-full rounded"
            placeholder="Enter budget"
            required
          />
        </div>
        <div>
          <label htmlFor="startDate" className="block font-medium mb-2">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-3 w-full rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block font-medium mb-2">End Date</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-3 w-full rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="status" className="block font-medium mb-2">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-3 w-full rounded"
          >
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className={`bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Add Project'}
        </button>
      </form>
      <ToastContainer />
    </DefaultLayout>
  );
};

export default ProjectForm;
