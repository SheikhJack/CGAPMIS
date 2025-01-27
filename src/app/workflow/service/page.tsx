"use client";
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ServiceList from "@/components/workflows/ServiceList";

const ServiceManager: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);

  const addService = (service: any) => {
    setServices([...services, service]);
  };

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
