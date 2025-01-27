"use client";

import React from "react";

interface ContractListProps {
  contracts: any[];
  onDeleteContract: (id: number) => void;
}

const ContractList: React.FC<ContractListProps> = ({ contracts, onDeleteContract }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mt-8">Contracts List</h2>
      {contracts.length > 0 ? (
        <table className="table-auto w-full mt-4 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Vendor</th>
              <th className="p-3 border">Start Date</th>
              <th className="p-3 border">End Date</th>
              <th className="p-3 border">Value</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={contract.id}>
                <td className="p-3 border">{contract.title}</td>
                <td className="p-3 border">{contract.vendor}</td>
                <td className="p-3 border">{new Date(contract.start_date).toLocaleDateString()}</td>
                <td className="p-3 border">{new Date(contract.end_date).toLocaleDateString()}</td>
                <td className="p-3 border">{contract.value}</td>
                <td className="p-3 border">{contract.status}</td>
                <td className="p-3 border">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => onDeleteContract(contract.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4">No contracts available.</p>
      )}
    </div>
  );
};

export default ContractList;
