import React, { useState } from "react";

const ProductDescription = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  const characterLimit = 250;

  const isLong = text.length > characterLimit;
  const visibleText = expanded ? text : text.slice(0, characterLimit);

  return (
    <div className='mb-6 mt-4'>
      <h2 className='text-lg font-semibold mb-4 dark:text-gray-300 underline'>
        Product Description
      </h2>
      <p className='text-md'>
        {visibleText}
        {isLong && !expanded && "..."}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className='text-purple-600 hover:underline text-sm mt-2'
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
};


export default ProductDescription;