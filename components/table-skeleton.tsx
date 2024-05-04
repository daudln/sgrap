import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTableLoading = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col">
        {/* Table Header */}
        <div className="flex flex-row bg-gray-200 py-2 px-4">
          <Skeleton className="w-[100px] h-[20px] rounded-full mr-2" />
          <Skeleton className="w-[100px] h-[20px] rounded-full mr-2" />
          <Skeleton className="w-[100px] h-[20px] rounded-full mr-2" />
          {/* Add more Skeleton components for additional table header columns */}
        </div>

        {/* Table Rows (Repeat as many times as needed) */}
        <div className="flex flex-row py-2 px-4">
          <Skeleton className="w-[100px] h-[20px] rounded-full mr-2" />
          <Skeleton className="w-[100px] h-[20px] rounded-full mr-2" />
          <Skeleton className="w-[100px] h-[20px] rounded-full mr-2" />
          {/* Add more Skeleton components for additional table columns */}
        </div>

        {/* Repeat the above row for as many rows as you want to display */}
      </div>
    </div>
  );
};

export default SkeletonTableLoading;
