"use client"
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const TenderListing: React.FC = () => {
  const [tenders, setTenders] = useState([]);

//   useEffect(() => {
//     // Fetch tenders from the backend API
//     const fetchTenders = async () => {
//       const response = await fetch("/api/tenders");
//       const data = await response.json();
//       setTenders(data);
//     };
//     fetchTenders();
//   }, []);

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
            {tenders.map((tender, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-2">tittle</td>
                <td className="p-2">deadline</td>
                <td className="p-2">budget</td>
                <td className="p-2">
                  <a  className="text-blue-500">View</a>
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
