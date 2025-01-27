"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify for notifications
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify CSS

interface TenderEvaluationFormData {
    tender_id: string;
    tenderer_name: string;
    evaluation_date: string;
    evaluation_criteria: string;
    technical_evaluation: string;
    financial_evaluation: string;
    evaluation_score: number;
    evaluator_name: string;
    evaluator_position: string;
    remarks: string;
}

const TenderEvaluationForm = () => {
    const [formData, setFormData] = useState<TenderEvaluationFormData>({
        tender_id: "",
        tenderer_name: "",
        evaluation_date: "",
        evaluation_criteria: "",
        technical_evaluation: "",
        financial_evaluation: "",
        evaluation_score: 0,
        evaluator_name: "",
        evaluator_position: "",
        remarks: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/forms/evaluation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("Tender Evaluation Submitted Successfully!"); // Show success message
                setFormData({
                    tender_id: "",
                    tenderer_name: "",
                    evaluation_date: "",
                    evaluation_criteria: "",
                    technical_evaluation: "",
                    financial_evaluation: "",
                    evaluation_score: 0,
                    evaluator_name: "",
                    evaluator_position: "",
                    remarks: "",
                });
            } else {
                throw new Error("Failed to submit the evaluation");
            }
        } catch (error: any) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <DefaultLayout>
            <form onSubmit={handleSubmit} className="space-y-6">
                <h1 className="text-2xl font-bold text-center mb-4">Tender Evaluation Form</h1>

                {/* Tender ID */}
                <div>
                    <label className="block text-sm font-semibold">Tender ID:</label>
                    <input
                        type="text"
                        name="tender_id"
                        value={formData.tender_id}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Tenderer Name */}
                <div>
                    <label className="block text-sm font-semibold">Tenderer Name:</label>
                    <input
                        type="text"
                        name="tenderer_name"
                        value={formData.tenderer_name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Evaluation Date */}
                <div>
                    <label className="block text-sm font-semibold">Evaluation Date:</label>
                    <input
                        type="date"
                        name="evaluation_date"
                        value={formData.evaluation_date}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Evaluation Criteria */}
                <div>
                    <label className="block text-sm font-semibold">Evaluation Criteria:</label>
                    <textarea
                        name="evaluation_criteria"
                        value={formData.evaluation_criteria}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Technical Evaluation */}
                <div>
                    <label className="block text-sm font-semibold">Technical Evaluation:</label>
                    <textarea
                        name="technical_evaluation"
                        value={formData.technical_evaluation}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Financial Evaluation */}
                <div>
                    <label className="block text-sm font-semibold">Financial Evaluation:</label>
                    <textarea
                        name="financial_evaluation"
                        value={formData.financial_evaluation}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Evaluation Score */}
                <div>
                    <label className="block text-sm font-semibold">Evaluation Score:</label>
                    <input
                        type="number"
                        name="evaluation_score"
                        min="0"
                        max="100"
                        value={formData.evaluation_score}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Evaluator Name */}
                <div>
                    <label className="block text-sm font-semibold">Evaluator Name:</label>
                    <input
                        type="text"
                        name="evaluator_name"
                        value={formData.evaluator_name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Evaluator Position */}
                <div>
                    <label className="block text-sm font-semibold">Evaluator Position:</label>
                    <input
                        type="text"
                        name="evaluator_position"
                        value={formData.evaluator_position}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Remarks */}
                <div>
                    <label className="block text-sm font-semibold">Remarks:</label>
                    <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className={`bg-blue-600 text-white px-6 py-3 rounded ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit Evaluation"}
                </button>
            </form>
            <ToastContainer />
        </DefaultLayout>
    );
};

export default TenderEvaluationForm;
