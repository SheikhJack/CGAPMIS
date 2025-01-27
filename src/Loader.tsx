import React from 'react';
import Image from 'next/image';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-12 h-12 border-4 border-white border-b-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
