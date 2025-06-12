import { useEffect, useState } from "react";

const MclilyLoader = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const letters = ["M", "c", "L", "i", "l", "y"];

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % letters.length);
      }, 400);

      return () => clearInterval(interval);
    }, 1000);
    return () => clearTimeout(startTimeout);
  }, [letters.length]);

    return (
      <div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-30'>
          <div
            className='w-full h-full rounded-full'
            style={{
              animation: "breathe 3s ease-in-out infinite",
              background:
                "radial-gradient(circle, hsla(160, 100%, 55%, 0.1) 0%, transparent 70%)",
            }}
          ></div>
        </div>

        <div className='text-center relative z-10'>
          <div className='text-6xl font-bold tracking-widest inline-block relative'>
            {letters.map((letter, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-300 font-sevilla ${
                  activeIndex === index
                    ? "text-aquamine-4 scale-110 drop-shadow-lg"
                    : "text-gray-600"
                }`}
                style={{
                  animation: `fadeIn 0.6s ease forwards`,
                  animationDelay: `${(index + 1) * 0.1}s`,
                  opacity: 0,
                  animationFillMode: "forwards",
                  ...(activeIndex === index && {
                    textShadow: "0 0 20px hsla(160, 100%, 55%, 0.6)",
                    color: "hsl(160, 100%, 55%)",
                  }),
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          <div className='flex justify-center gap-2 mt-8'>
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className='w-2 h-2 bg-emerald-400 rounded-full'
                style={{
                  animation: `pulse 1.5s ease-in-out infinite`,
                  animationDelay: `${index * 0.2}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
};
export default MclilyLoader;
