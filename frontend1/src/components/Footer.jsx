import React from "react";

const Footer = () => {
  return (
    <footer className="dark:bg-surface bg-white h-[5rem] border-t border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center md:flex-row shadow-lg">
      <h5 className="normal-case mb-0.5 md:mb-0 text-gray-900 dark:text-gray-200">
        &copy;{new Date().getFullYear()}
        <span className="font-semibold "> McLily Stores</span>
      </h5>
      <h5 className="normal-case md:ml-2 text-gray-700 dark:text-gray-300">
        All Rights Reserved
      </h5>
    </footer>
  );
};

export default Footer;
