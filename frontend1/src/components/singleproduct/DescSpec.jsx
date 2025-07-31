import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { ArrowUp, SwitchCamera } from "lucide-react";

const DescSpec = ({ specifications, description }) => {
  const [activeTab, setActiveTab] = useState("specifications");
  const [isScrolled, setIsScrolled] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (componentRef.current) {
        const { top, bottom } = componentRef.current.getBoundingClientRect();
         const windowHeight = window.innerHeight;

        
        setIsScrolled(top < -10 && bottom > windowHeight); // Show button if scrolled past 100px above component
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchTab = (tab) => {
    setActiveTab(tab)
    if (componentRef.current) {
      componentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start", 
      });
    }
  };


  if (!specifications || !description) {
    return <div>Loading...</div>;
  }
  return (
    <div className=' bg-surface relative mb-6' ref={componentRef}>
      <div className='flex sticky top-0 z-10 bg-surface'>
        {["specifications", "description"].map((tab) => (
          <button
            key={tab}
            onClick={() => switchTab(tab)}
            className={`flex-1 py-4 px-4 text-sm font-medium border-b-2 capitalize ${
              activeTab === tab
                ? "border-primary-500 text-primary-600 dark:text-primary-300 dark:border-primary-200"
                : "border-transparent text-text hover:text-gray-700 cursor-pointer dark:hover:text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className='p-4'>
        {activeTab === "description" && (
          <div className='text-sm text-gray-700 dark:text-gray-300 leading-relaxed'>
            <p>{description}</p>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className='space-y-3  divide-y-1 divide-primary-400'>
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className='flex justify-between py-2'>
                <span className='text-sm text-gray-800 dark:text-gray-300 capitalize'>
                  {key}
                </span>
                <span className='text-sm font-medium text-text'>{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {isScrolled && activeTab === "description" && (
        <button
          onClick={() => switchTab("specifications")}
          className='fixed bottom-30 right-12 bg-primary-500 dark:bg-primary-300 hover:bg-primary-600 text-white rounded-full p-6 shadow-lg transition-opacity duration-300 z-20'
          aria-label='Switch to Specifications'
        >
          <SwitchCamera size={22}/>
        </button>
      )}
    </div>
  );
};

DescSpec.propTypes = {
  specifications: PropTypes.shape({}).isRequired,
  description: PropTypes.string.isRequired,
};

export default DescSpec;
