"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loader from "@/components/common/Loader";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TenderListing: React.FC = () => {
  const router = useRouter();

  const { data, error } = useSWR("/api/forms/createTender", fetcher);

  const handleViewDetails = (id: string) => {
    router.push(`/workflow/tender-details/${id}`);
  };

  return (
    <DefaultLayout>
      {/* Conditionally render loader or error message */}
      {error && <div>Error loading tenders...</div>}
      {!data && !error && <div><Loader /></div>}

      {data && (
        <div className="mb-100 pb-10">
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
              {data.tenders.map((tender: any) => (
                <tr key={tender.id} className="hover:bg-gray-100">
                  <td className="p-2">{tender.title}</td>
                  <td className="p-2">{tender.deadline}</td>
                  <td className="p-2">{tender.budget}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleViewDetails(tender.id)}
                      className="text-blue-500"
                    >
                      Apply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DefaultLayout>
  );
};

export default TenderListing;
