import React from "react";
import { useSelector } from "react-redux";

function News() {
  const { loading, error } = useSelector((state) => state.news);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p className="text-white text-center">Data fetching, please wait...</p>
      </div>
    );
  }

  if (error !== null) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p className="text-slate-500 text-xs text-center">
          Something wrong with your data fetching.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full w-full">
      <p className="text-white text-center">You News Here</p>
    </div>
  );
}

export default News;
