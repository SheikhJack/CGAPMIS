"use client"
import React, { useEffect } from 'react';
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loader from '@/components/common/Loader';



export default function Home() {


  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/entry'; // Redirect to '/auth/entry'
    }
  }, []);


  return (
    <div>
      {/* You can optionally add content here or leave it empty */}
      <Loader/>
    </div>

  );
}
