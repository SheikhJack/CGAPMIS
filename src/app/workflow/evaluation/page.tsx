"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useSWR from "swr";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Loader"; 
import { format } from "date-fns";

interface Tenderer {
    tender_id: string;
    tenderer_name: string;
    evaluation_score: number;
    evaluation_date: string;
    evaluator_name: string;
}

const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
};

const TendererList = () => {
    const { data, error, isLoading } = useSWR<Tenderer[]>("/api/forms/evaluation", fetcher, {
        onError: () => toast.error("Error fetching tenderers list!"),
    });

    return (
        <DefaultLayout>
            {isLoading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <Loader />
                </div>
            ) : error ? (
                <div className="text-center text-red-500 min-h-screen flex justify-center items-center">
                    <p>Failed to load data.</p>
                </div>
            ) : data?.length === 0 ? (
                <div className="text-center text-gray-500 min-h-screen flex justify-center items-center">
                    <p>No evaluated tenderers found.</p>
                </div>
            ) : (
                <div className="p-6 pb-30 mb-100">
                    <h1 className="text-2xl font-bold text-center mb-4">Evaluated Tenderers</h1>
                    <p>Note that high evaluation score wins the tender!</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <caption className="text-lg font-semibold my-2">
                                List of Evaluated Tenderers
                            </caption>
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Tenderer Name</th>
                                    <th className="border px-4 py-2">Tender ID</th>
                                    <th className="border px-4 py-2">Evaluation Score</th>
                                    <th className="border px-4 py-2">Evaluation Date</th>
                                    <th className="border px-4 py-2">Evaluator Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((tenderer) => (
                                    <tr key={tenderer.tender_id}>
                                        <td className="border px-4 py-2">{tenderer.tenderer_name}</td>
                                        <td className="border px-4 py-2">{tenderer.tender_id}</td>
                                        <td className="border px-4 py-2">{tenderer.evaluation_score}</td>
                                        <td className="border px-4 py-2">
                                            {format(new Date(tenderer.evaluation_date), "dd MMM yyyy")}
                                        </td>
                                        <td className="border px-4 py-2">{tenderer.evaluator_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </DefaultLayout>
    );
};

export default TendererList;
