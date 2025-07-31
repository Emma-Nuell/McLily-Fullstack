import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Star } from "lucide-react";

const ProductRating = () => {
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
    const [customerName, setCustomerName] = useState("");
    
      const handleStarClick = (starIndex) => {
        setRating(starIndex + 1);
      };

      const handleSubmit = () => {
        if (rating === 0 || !customerName) {
          alert("Please select a rating");
          return;
        }

        const reviewData = {
          rating,
          reviewTitle: reviewTitle,
          reviewMessage: reviewText,
          userName: customerName,
          
        };

        console.log("Review submitted:", reviewData);
        alert("Thank you for your review!");

        // Reset form
        setRating(0);
        setReviewTitle("");
        setReviewText("");
        setCustomerName("");
      };
  return (
    <div className='bg-background-white page-100'>
      <div className='px-4 py-6 max-w-md mx-auto'>
        {/* Question */}
        <p className='text-gray-600 dark:text-gray-200 capitalize text-sm mb-6'>
          how would you rate this product?
        </p>

        {/* Product Info */}
        <div className='flex items-center space-x-4 mb-8'>
          <div className='w-30 h-30 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden'>
            <img
              src='https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop'
              alt='product'
              className='w-30 h-30 object-cover '
            />
          </div>
          <div className='flex-1'>
            <h2 className='text-text text-base font-medium  px-3 py-2 rounded line-clamp-2'>
              Fashion Black Sweatshirt With White Stripe
            </h2>
          </div>
        </div>

        {/* Star Rating */}
        <div className='text-center mb-8'>
          <p className='text-gray-600 dark:text-gray-300 text-sm mb-4'>
            Tap the stars to choose
          </p>
          <div className='flex justify-center space-x-4'>
            {[0, 1, 2, 3, 4].map((index) => (
              <Star
                key={index}
                className={`cursor-pointer transition-colors ${
                  index < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-300 text-gray-300"
                }`}
                onClick={() => handleStarClick(index)}
                size={20}
              />
            ))}
          </div>
        </div>

        {/* Feedback Question */}
        <h3 className='text-text text-lg font-medium mb-6'>
          What did you like about this product?
        </h3>

        <div className='mb-6'>
          <p className='text-gray-700 dark:text-gray-200 text-sm uppercase tracking-wide mb-4'>
            SHARE YOUR EXPERIENCE WITH THE PRODUCT!
          </p>

          <div className='mb-4'>
            <input
              type='text'
              placeholder='Review Title'
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              className='w-full bg-transparent border-b border-primary-300 dark:border-primary-100 text-text placeholder-gray-400 py-2 focus:outline-none focus:border-primary-400 dark:focus:border-primary-300 transition-colors'
            />
          </div>

          <div className='mb-4'>
            <label className='dark:text-primary-300 text-primary-600  text-sm mb-2 block'>
              Write a Review
            </label>
            <textarea
              placeholder='How was your experience?'
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className='w-full bg-transparent border border-primary-300 dark:border-primary-100 text-text placeholder-gray-400 p-3 rounded focus:outline-none focus:border-primary-300 transition-colors resize-none h-66 scrollbar-hidden'
            />
          </div>

          {/* Customer Name */}
          <div className='mb-6'>
            <label className='text-gray-800 dark:text-gray-200 text-sm mb-2 block'>
              Your Name
            </label>
            <input
              type='text'
              placeholder='Enter your name'
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className='w-full bg-transparent border-b border-primary-300 dark:border-primary-100 text-text placeholder-gray-400 py-2 focus:outline-none focus:border-primary-300 transition-colors'
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className='w-full bg-gradient-to-r from-primary-400 dark:from-primary-200 to-primary-400 dark:to-primary-200 hover:from-primary-600 dark:hover:from-primary-300 hover:to-primary-700 dark:hover:to-primary-400  text-white font-medium py-4 rounded-lg transition-all duration-200 transform  active:scale-95 shadow-lg mt-6'
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

ProductRating.propTypes = {};

export default ProductRating;
