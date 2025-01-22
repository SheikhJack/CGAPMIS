"use client";

import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ContractList from "@/components/workflows/ContractList";

const ContractsManagement: React.FC = () => {
  const [contracts, setContracts] = useState<any[]>([]);

  const handleAddContract = (contract: any) => {
    setContracts([...contracts, contract]);
  };

  const handleDeleteContract = (index: number) => {
    setContracts(contracts.filter((_, i) => i !== index));
  };

  return (
    <DefaultLayout>
      <div className="p-6 mb-100">
        <h1 className="text-2xl font-bold mb-6">Contracts Management</h1>
        <ContractList contracts={contracts} onDeleteContract={handleDeleteContract} />
      </div>
    </DefaultLayout>
  );
};

export default ContractsManagement;
