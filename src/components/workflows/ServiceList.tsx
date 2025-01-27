"use client";

import React from "react";
import useSWR from "swr";

interface Service {
  name: string;
  department: string;
  annualCost: number;
  outsourcingCost: number;
  status: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ServiceList: React.FC = () => {
  const { data, error, isLoading } = useSWR<{ success: boolean; contracts: Service[] }>("/api/forms/service", fetcher);

  console.log('service:', data)

  if (isLoading) {
    return <p>Loading services...</p>;
  }

  if (error) {
    return <p>Failed to load services. Please try again later.</p>;
  }

  const services = data?.contracts || [];

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
