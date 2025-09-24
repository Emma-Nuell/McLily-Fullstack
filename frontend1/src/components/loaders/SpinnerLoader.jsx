import React from "react";


const SpinnerLoader = () => {
  return (
    <div>
      <div className='flex flex-col items-center gap-8'>
        {/* Spinner */}
        <div
          className='w-15 h-15 border-4 border-gray-800 border-t-emerald-400 rounded-full'
          style={{
            animation: "spin 1s linear infinite",
            boxShadow: "0 0 20px hsla(160, 100%, 55%, 0.3)",
          }}
        ></div>
      </div>
    </div>
  );
}
export default SpinnerLoader