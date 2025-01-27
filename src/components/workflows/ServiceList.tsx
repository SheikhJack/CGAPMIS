"use client";

import React from "react";

interface Service {
  name: string;
  department: string;
  annualCost: number;
  outsourcingCost: number;
  status: string;
}

interface ServiceListProps {
  services: Service[];
}

const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
  return (
    <div>
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
  );
};

export default ServiceList;
