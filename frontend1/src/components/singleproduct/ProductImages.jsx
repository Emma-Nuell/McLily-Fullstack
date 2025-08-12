import React, { useState } from "react"
import PropTypes from 'prop-types'


const ProductImages = ({ product }) => {
  let images = product?.images || [];
  const [main, setMain] = useState(images[0]);

  ProductImages.propTypes = {
    product: PropTypes.shape({
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }

  return (
    <div className="bg-surface pt-8">
      {/* Main Image */}
      <img
        src={main}
        alt="Main product"
        className="w-full block rounded-md object-cover h-[300px] md:h-[350px] sm:h-[320px]"
      />

      {/* Image Gallery */}
      <div className="mt-4 grid py-2 grid-cols-5 gap-4 px-2 overflow-x-auto whitespace-nowrap scrollbar-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`w-full block rounded-md object-cover h-[64px] md:h-[75px] sm:h-[70px] cursor-pointer ${
              image === main ? 'ring-1 ring-primary-400 dark:ring-primary-300' : ''
            }`}
            onClick={() => setMain(images[index])}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;