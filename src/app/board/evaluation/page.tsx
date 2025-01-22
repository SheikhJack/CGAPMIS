"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";

export default function BoardEvaluation() {
  const [evaluations, setEvaluations] = useState([
    { criterion: "Governance", score: 0 },
    { criterion: "Performance", score: 0 },
    { criterion: "Compliance", score: 0 },
    { criterion: "Communication", score: 0 },
    { criterion: "Strategic Alignment", score: 0 },
  ]);

  const [comments, setComments] = useState("");

  const handleScoreChange = (index: number, value: number) => {
    const updatedEvaluations = [...evaluations];
    updatedEvaluations[index].score = value;
    setEvaluations(updatedEvaluations);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitted Evaluations:", evaluations);
    console.log("Comments:", comments);

    // Reset form
    setEvaluations(
      evaluations.map((evaluation) => ({ ...evaluation, score: 0 }))
    );
    setComments("");
  };

  return (
    <DefaultLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Board Evaluation</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Evaluation Criteria */}
          <h2 className="text-xl font-semibold mb-4">Evaluation Criteria</h2>
          {evaluations.map((evaluation, index) => (
            <div key={index} className="flex items-center space-x-4">
              <label className="w-1/2 font-medium">
                {evaluation.criterion}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={evaluation.score}
                onChange={(e) =>
                  handleScoreChange(index, Number(e.target.value))
                }
                className="flex-1"
              />
              <span className="w-12 text-center">{evaluation.score}</span>
            </div>
          ))}

          {/* Comments Section */}
          <div>
            <label htmlFor="comments" className="block font-medium mb-2">
              Additional Comments
            </label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="border p-2 w-full rounded"
              rows={4}
              placeholder="Provide any additional comments or feedback"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit Evaluation
          </button>
        </form>

        {/* Evaluation Summary */}
        <h2 className="text-xl font-semibold mt-8">Evaluation Summary</h2>
        <table className="table-auto w-full border mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Criterion</th>
              <th className="p-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map((evaluation, index) => (
              <tr key={index}>
                <td className="p-2">{evaluation.criterion}</td>
                <td className="p-2 text-center">{evaluation.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
}

