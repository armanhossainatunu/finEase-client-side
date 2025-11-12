import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div
          className="animate-spin inline-block w-20 h-20 border-[3px] border-current border-t-transparent text-[#875DF8] rounded-full"
          role="status"
          aria-label="loading"
        >
          <img src="https://i.ibb.co.com/Q3Mg4GZt/favicon.png" alt="Loading" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
