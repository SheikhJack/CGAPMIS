"use client";

import React from "react";
import useSWR from "swr";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ContractList from "@/components/workflows/ContractList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetcher = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Check if data.contracts is undefined or empty
    if (!data || !data.contracts) {
      throw new Error("No contracts found in response");
    }
    return data;
  } catch (err) {
    console.error("Fetcher error:", err);
    throw err;  // Rethrow to trigger the error state in SWR
  }
};


const ContractsManagement: React.FC = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/forms/contracts", fetcher, {
    onSuccess: (data) => {
      if (!data.contracts || data.contracts.length === 0) {
        console.warn("No contracts found.");
      }
    }
  });

  console.log("isLoading:", isLoading);
  console.log("data:", data);
  console.log("error:", error);

  const handleDeleteContract = async (id: number) => {
    try {
      toast.info("Deleting contract...");
      const response = await fetch(`/api/forms/contracts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete contract");
      }
      const result = await response.json();
      if (result.success) {
        toast.success("Contract deleted successfully!");
        mutate(
          (prevData: any) => ({
            ...prevData,
            contracts: prevData.contracts.filter((contract: any) => contract.id !== id),
          }),
          false // This prevents a refetch after the mutate
        );
      } else {
        toast.error(result.message || "Failed to delete contract");
      }
    } catch (err: any) {
      console.error("Error deleting contract:", err.message);
      toast.error("An error occurred while deleting the contract.");
    }
  };




  return (
    <DefaultLayout>
      {isLoading ? (
        <p className="p-6 pb-30 mb-100">Loading contracts...</p>
      ) : error || !data ? (
        <p className="text-red-500 p-6 mb-100">Failed to load contracts or no data available.</p>
      ) : (
        <div className="p-6 pb-30 mb-100">
          <h1 className="text-2xl font-bold mb-6">Contracts Management</h1>
          <ContractList contracts={data.contracts || []} onDeleteContract={handleDeleteContract} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default ContractsManagement;

