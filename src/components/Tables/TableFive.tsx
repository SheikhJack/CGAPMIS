"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import a charting library like ApexCharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function PerformanceMonitoring() {
  const [metrics, setMetrics] = useState([
    { id: 1, parameter: "Project Completion Rate", value: 85, target: 90 },
    { id: 2, parameter: "Board Attendance Rate", value: 92, target: 95 },
    { id: 3, parameter: "Budget Utilization", value: 78, target: 80 },
  ]);

  const chartOptions = {
    chart: {
      type: "bar" as "bar",
    },
    xaxis: {
      categories: metrics.map((metric) => metric.parameter),
    },
  };

  const chartSeries = [
    {
      name: "Actual",
      data: metrics.map((metric) => metric.value),
    },
    {
      name: "Target",
      data: metrics.map((metric) => metric.target),
    },
  ];

  return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Performance Monitoring</h1>

        {/* Performance Metrics */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold">Key Metrics</h2>
          <table className="table-auto w-full border mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Parameter</th>
                <th className="p-2">Actual (%)</th>
                <th className="p-2">Target (%)</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric) => (
                <tr key={metric.id}>
                  <td className="p-2">{metric.parameter}</td>
                  <td className="p-2">{metric.value}%</td>
                  <td className="p-2">{metric.target}%</td>
                  <td
                    className={`p-2 ${
                      metric.value >= metric.target
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {metric.value >= metric.target ? "On Track" : "Needs Attention"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Performance Chart */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </div>

        {/* Insights Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Insights</h2>
          <ul className="list-disc pl-6 space-y-2">
            {metrics.map((metric) => (
              <li key={metric.id}>
                {metric.parameter} is{" "}
                {metric.value >= metric.target ? "on track" : "below target"} at{" "}
                {metric.value}%. Target is {metric.target}%.
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
}

