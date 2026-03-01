// import { useProductContext } from "../../context/product-context";
import Loading from "../Loading";
import { useSwipeable } from "react-swipeable";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const FeaturedProducts = ({ products: featured }) => {
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
        prevIndex === 0 ? featured.length - 1 : prevIndex - 1,
      ),
    onTouchStart: () => setIsInteracting(true),
    onTouchEnd: () => setIsInteracting(false),
  });

  if (!featured || featured.length === 0) {
    return <Loading />;
  }

  return (
    <section className="w-full max-w-[--max-width] mx-auto my-8 px-4">
      {/* Slideshow Container */}
      <div
        className="relative flex justify-center items-center h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden touch-pan-y group rounded-3xl shadow-xl"
        {...handlers}
      >
        <Link
          to={`/products/singleProduct/${featured[currentIndex].productId}`}
          className="block relative w-full h-full bg-surface"
        >
          <img
            src={featured[currentIndex].images[0]}
            alt={featured[currentIndex].name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/40 to-transparent p-8 md:p-12 flex flex-col justify-end">
            <h3 className="text-white text-3xl md:text-5xl font-bold font-comorant drop-shadow-lg line-clamp-2 mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              {featured[currentIndex].name}
            </h3>
            <span className="text-primary-300 font-medium text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              View Product &rarr;
            </span>
          </div>
        </Link>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-2 mb-2">
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
  products: PropTypes.array,
};

export default FeaturedProducts;
