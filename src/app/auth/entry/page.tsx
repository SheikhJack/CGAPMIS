"use client";
import React from "react";
import Link from "next/link";

const LoginSelectionPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Choose Login Type</h1>
        <div className="flex flex-col gap-4">
          <Link
            href="/auth/signin-admin"
            className="w-full block text-center py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Admin Login
          </Link>
          <Link
            href="/auth/signin-board"
            className="w-full block text-center py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Board Members Login
          </Link>
          <Link
            href="/auth/signin"
            className="w-full block text-center py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            User Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginSelectionPage;
