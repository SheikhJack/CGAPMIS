"use client";
import React, { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ServiceList from "@/components/workflows/ServiceList";

interface Service {
  name: string;
  department: string;
  annualCost: number;
  outsourcingCost: number;
  status: string;
}

const ServiceManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/forms/service");
        const data = await response.json();
        if (data.success) {
          setServices(data.contracts);
        } else {
          console.error("Failed to load services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <DefaultLayout>
      <div className="space-y-8 mb-100 pb-20">
        <section>
          <h1 className="text-2xl font-bold">Service List</h1>
          <ServiceList services={services} />
        </section>
      </div>
    </DefaultLayout>
  );
};

export default ServiceManager;
