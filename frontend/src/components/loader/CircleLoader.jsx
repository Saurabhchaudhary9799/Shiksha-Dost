import React from "react";

const CircleLoader = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
    </div>
  );
};

export default CircleLoader;
