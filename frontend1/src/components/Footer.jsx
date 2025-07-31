import React from "react";

const Footer = () => {
  return (
    <footer className='bg-surface h-[5rem] border-t border-gray-200 dark:border-gray-600 flex flex-col items-center justify-center text-center md:flex-row'>
      <h5 className='normal-case mb-0.5 md:mb-0'>
        &copy;{new Date().getFullYear()}
        <span className='font-semibold'> McLily Stores</span>
      </h5>
      <h5 className='normal-case md:ml-2'>All Rights Reserved</h5>
    </footer>
  );
};

export default Footer;
