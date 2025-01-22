"use client"
import React, { useState } from 'react';
import { Metadata } from "next";
import DefaultLayout from '@/components/Layouts/DefaultLayout';



const ServiceIdentification: React.FC = () => {
  const [serviceName, setServiceName] = useState('');
  const [department, setDepartment] = useState('');
  const [annualCost, setAnnualCost] = useState('');
  const [outsourcingCost, setOutsourcingCost] = useState('');
  const [reasons, setReasons] = useState('');
  const [impact, setImpact] = useState('');
  const [services, setServices] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add service to list
    const newService = {
      name: serviceName,
      department,
      annualCost,
      outsourcingCost,
      reasons,
      impact,
      status: 'Draft', // Default status
    };
    setServices([...services, newService]);

    // Clear form
    setServiceName('');
    setDepartment('');
    setAnnualCost('');
    setOutsourcingCost('');
    setReasons('');
    setImpact('');
  };

  return (
    <DefaultLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Service Identification</h1>
        {/* Form for Service Identification */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="serviceName" className="block font-medium mb-2">Service Name</label>
            <input
              type="text"
              id="serviceName"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="border p-3 w-full rounded"
              placeholder="Enter service name"
              required
            />
          </div>
          <div>
            <label htmlFor="department" className="block font-medium mb-2">Department/Ministry</label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border p-3 w-full rounded"
              placeholder="Enter department or ministry"
              required
            />
          </div>
          <div>
            <label htmlFor="annualCost" className="block font-medium mb-2">Current Annual Cost</label>
            <input
              type="number"
              id="annualCost"
              value={annualCost}
              onChange={(e) => setAnnualCost(e.target.value)}
              className="border p-3 w-full rounded"
              placeholder="Enter current annual cost"
              required
            />
          </div>
          <div>
            <label htmlFor="outsourcingCost" className="block font-medium mb-2">Estimated Outsourcing Cost</label>
            <input
              type="number"
              id="outsourcingCost"
              value={outsourcingCost}
              onChange={(e) => setOutsourcingCost(e.target.value)}
              className="border p-3 w-full rounded"
              placeholder="Enter estimated outsourcing cost"
              required
            />
          </div>
          <div>
            <label htmlFor="reasons" className="block font-medium mb-2">Reasons for Outsourcing</label>
            <textarea
              id="reasons"
              value={reasons}
              onChange={(e) => setReasons(e.target.value)}
              className="border p-3 w-full rounded"
              rows={4}
              placeholder="Provide reasons for outsourcing"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="impact" className="block font-medium mb-2">Service Impact Assessment</label>
            <textarea
              id="impact"
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              className="border p-3 w-full rounded"
              rows={4}
              placeholder="Describe the potential impact"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        {/* Table to Display Identified Services */}
        <h2 className="text-xl font-bold mt-8">Identified Services</h2>
        {services.length > 0 ? (
          <table className="table-auto w-full mt-4 border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border">Service Name</th>
                <th className="p-3 border">Department</th>
                <th className="p-3 border">Annual Cost</th>
                <th className="p-3 border">Outsourcing Cost</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={index} className="text-center">
                  <td className="p-3 border">{service.name}</td>
                  <td className="p-3 border">{service.department}</td>
                  <td className="p-3 border">{service.annualCost}</td>
                  <td className="p-3 border">{service.outsourcingCost}</td>
                  <td className="p-3 border">{service.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4">No services identified yet.</p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ServiceIdentification;
