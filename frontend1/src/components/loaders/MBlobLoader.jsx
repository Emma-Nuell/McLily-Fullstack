import React from "react";
import Logo from "../../assets/logo.svg?react";

const MBlobLoader = () => {
  return (
    <div className="">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsla(160, 100%, 55%, 0.1) 0%, transparent 70%)",
          animation: "breathe-glow 4s ease-in-out infinite",
        }}
      ></div>

      <div className="flex flex-col items-center gap-8 relative z-10">
        {/* Blob with M */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Morphing blob */}
          <div
            className="absolute w-50 h-50 shadow-lg"
            style={{
              background: "hsl(160, 100%, 55%)",
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              animation: "morph 8s ease-in-out infinite",
              boxShadow:
                "0 0 30px hsla(160, 100%, 55%, 0.6), inset 0 0 30px hsla(160, 100%, 70%, 0.3)",
            }}
          >
            {/* Inner gradient overlay */}
            <div
              className="absolute w-full h-full"
              style={{
                background:
                  "linear-gradient(45deg, hsla(160, 100%, 65%, 0.8) 0%, hsla(160, 100%, 45%, 0.8) 100%)",
                borderRadius: "inherit",
                animation: "morph-inner 6s ease-in-out infinite reverse",
              }}
            ></div>
          </div>

          {/* Fixed M letter */}
          <div
            className="relative z-10 w-26 h-26"
           
          >
            <Logo className="w-full h-full dark:text-gray-600 text-gray-800 fill-current drop-shadow-md" />
            
          </div>

          {/* Floating particles */}
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-70"
              style={{
                top: ["20%", "60%", "70%", "10%"][index],
                left: ["10%", "85%", "20%", "70%"][index],
                animation: `float-around ${4 + index}s linear infinite`,
                animationDelay: `${index}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Animated dots */}
        {/* <div className="flex gap-3">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-full shadow-lg"
              style={{
                background: `hsl(160, ${100 - index * 10}%, ${
                  55 - index * 5
                }%)`,
                animation: "bounce-dot 1.4s ease-in-out infinite",
                animationDelay: `${index * 0.2}s`,
                boxShadow: "0 0 15px hsla(160, 100%, 55%, 0.6)",
              }}
            ></div>
          ))}
        </div> */}
      </div>
    </div>
  );
};
export default MBlobLoader;
