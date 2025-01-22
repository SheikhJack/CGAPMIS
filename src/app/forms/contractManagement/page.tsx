"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";

interface ContractFormProps {
    onAddContract: (contract: any) => void;
}

const ContractForm: React.FC<ContractFormProps> = ({ onAddContract }) => {
    const [contractTitle, setContractTitle] = useState("");
    const [vendor, setVendor] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [value, setValue] = useState("");
    const [status, setStatus] = useState("Active");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newContract = {
            title: contractTitle,
            vendor,
            startDate,
            endDate,
            value,
            status,
        };
        onAddContract(newContract);

        // Clear form
        setContractTitle("");
        setVendor("");
        setStartDate("");
        setEndDate("");
        setValue("");
        setStatus("Active");
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add Contract" />
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="contractTitle" className="block font-medium mb-2">
                        Contract Title
                    </label>
                    <input
                        type="text"
                        id="contractTitle"
                        value={contractTitle}
                        onChange={(e) => setContractTitle(e.target.value)}
                        className="border p-3 w-full rounded"
                        placeholder="Enter contract title"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="vendor" className="block font-medium mb-2">
                        Vendor
                    </label>
                    <input
                        type="text"
                        id="vendor"
                        value={vendor}
                        onChange={(e) => setVendor(e.target.value)}
                        className="border p-3 w-full rounded"
                        placeholder="Enter vendor name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="startDate" className="block font-medium mb-2">
                        Start Date
                    </label>
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
                    <label htmlFor="endDate" className="block font-medium mb-2">
                        End Date
                    </label>
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
                    <label htmlFor="value" className="block font-medium mb-2">
                        Contract Value
                    </label>
                    <input
                        type="number"
                        id="value"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="border p-3 w-full rounded"
                        placeholder="Enter contract value"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="status" className="block font-medium mb-2">
                        Status
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border p-3 w-full rounded"
                    >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Expired">Expired</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                >
                    Add Contract
                </button>
            </form>
        </DefaultLayout>
    );
};

export default ContractForm;
