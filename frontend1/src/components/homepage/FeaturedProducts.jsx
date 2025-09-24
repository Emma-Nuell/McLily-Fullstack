// import { useProductContext } from "../../context/product-context";
import Loading from "../Loading";
import { useSwipeable } from "react-swipeable";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'


const FeaturedProducts = ({products: featured}) => {
  // const { featuredProducts: featured } = useProductContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (isInteracting || !featured?.length) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featured.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featured, isInteracting]);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featured.length),
    onSwipedRight: () =>
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? featured.length - 1 : prevIndex - 1
      ),
    onTouchStart: () => setIsInteracting(true),
    onTouchEnd: () => setIsInteracting(false),
  });

  if (!featured || featured.length === 0) {
    return <Loading />;
  }

  return (
    <section className='bg-white dark:bg-surface w-[90%] mx-auto my-2.5 rounded pb-2.5'>
      {/* Slideshow Container */}
      <div
        className='relative flex justify-center items-center h-[220px] overflow-hidden touch-pan-y max-w-full'
        {...handlers}
      >
        <Link
          to={`/products/singleProduct/${featured[currentIndex].productId}`}
          className='relative w-[90%] h-[90%] rounded-xl max-w-[500px] bg-white dark:bg-surface'
        >
          <img
            src={featured[currentIndex].images[0]}
            alt={featured[currentIndex].name}
            className='w-full h-full object-contain rounded-xl transition-colors duration-300'
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
            <h3 className="text-gray-300 line-clamp-1">{featured[currentIndex].name}</h3>
          </div>
        </Link>
      </div>

      {/* Indicators */}
      <div className='flex justify-center mt-2 mb-2'>
        {featured.map((_, index) => (
          <button
            key={index}
            className={`w-3.5 h-3.5 mx-1.5 rounded-full transition-colors duration-300 border-none cursor-pointer ${
              index === currentIndex ? "bg-primary-400" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};



FeaturedProducts.propTypes = {
  products: PropTypes.array
}


export default FeaturedProducts;
