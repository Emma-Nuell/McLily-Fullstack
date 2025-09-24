import React from "react";


const DotLoader = () => {
  return (
    <div>
      {" "}
      <div className='flex flex-col items-center gap-8'>
        {/* Three bouncing dots */}
        <div className='flex gap-2'>
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className='w-4 h-4 rounded-full'
              style={{
                background: "hsl(160, 100%, 55%)",
                animation: "bounce-dots 1.4s ease-in-out infinite",
                animationDelay: `${index * 0.16}s`,
                boxShadow: "0 0 10px hsla(160, 100%, 55%, 0.5)",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default DotLoader