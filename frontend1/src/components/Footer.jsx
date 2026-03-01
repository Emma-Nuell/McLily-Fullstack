import React from "react";

const Footer = () => {
  return (
    <footer className="dark:bg-surface/80 bg-white/80 backdrop-blur-md h-[5rem] border-t border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center md:flex-row shadow-sm">
      <h5 className="normal-case mb-0.5 md:mb-0 text-gray-900 dark:text-gray-200">
        &copy;{new Date().getFullYear()}
        <span className="font-semibold "> MGK Stores</span>
      </h5>
      <h5 className="normal-case md:ml-2 text-gray-700 dark:text-gray-300">
        All Rights Reserved
      </h5>
    </footer>
  );
};

export default Footer;
