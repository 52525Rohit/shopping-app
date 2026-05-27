import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-64 bg-gray-300 dark:bg-gray-600"></div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
        <div className="space-y-2 mb-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
        </div>
        <div className="flex items-center mb-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
