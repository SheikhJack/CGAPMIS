"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const TenderListing: React.FC = () => {
    const router = useRouter();
    const [tenders, setTenders] = useState([
        { id: "1", title: "Road Construction", deadline: "2025-12-31", budget: "5,000000" },
        { id: "2", title: "Office Cleaning", deadline: "2025-10-15", budget: "150,000" },
    ]);

    const handleViewDetails = (id: string) => {
        router.push(`/workflows/tender-details/${id}`);
    };

    return (
        <DefaultLayout>

            <div className="mb-100">
                <h1 className="text-2xl font-bold mb-4">Tender Listings</h1>
                <table className="table-auto w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Title</th>
                            <th className="p-2">Deadline</th>
                            <th className="p-2">Budget</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenders.map((tender) => (
                            <tr key={tender.id} className="hover:bg-gray-100">
                                <td className="p-2">{tender.title}</td>
                                <td className="p-2">{tender.deadline}</td>
                                <td className="p-2">{tender.budget}</td>
                                <td className="p-2">
                                    <button
                                        onClick={() => handleViewDetails(tender.id)}
                                        className="text-blue-500"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DefaultLayout>
    );
};

export default TenderListing;
