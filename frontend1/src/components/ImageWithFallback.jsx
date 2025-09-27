import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Logo from "../assets/logo.svg?react";

const ImageWithFallback = ({src, alt, className, onTouch, index}) => {
    const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative ${className}`}>
      {/* Fallback logo */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <Logo className="w-12 text-primary-500 dark:text-primary-300 fill-current drop-shadow-md" />
        </div>
      )}

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full rounded-md object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onClick={() => onTouch(index)}
      />
    </div>
  );
}

ImageWithFallback.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    onTouch: PropTypes.func,
    index: PropTypes.number
}

export default ImageWithFallback