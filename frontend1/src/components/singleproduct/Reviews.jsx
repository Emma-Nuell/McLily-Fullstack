import React from "react";
import PropTypes from "prop-types";
import { Star } from "lucide-react";

const Reviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <div>Loading...</div>;
  }

  const StarRating = ({ rating, size = "w-8 h-8" }) => {
    return (
      <div className='flex items-center'>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} my-1 ${
              star <= Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <div className='border-t border-primary-400 dark:border-primary-300 pt-2'>
      <div className='space-y-4'>
        {reviews.map((review, index) => (
          <div
            key={review._id || index}
            className='border-b border-primary-400 dark:border-primary-300 pb-4 last:border-b-0'
          >
            <div className='flex items-center justify-between mb-2'>
              <div className='flex items-center space-x-4'>
                {" "}
                <div className='w-16 h-16 bg-primary-600 dark:bg-primary-300 rounded-full flex items-center justify-center text-text text-sm font-medium'>
                  {review.userName?.charAt(0) || "U"}
                </div>
                <span className='text-sm font-medium text-text capitalize'>
                  {review.userName}
                </span>
                <span className='text-xs bg-green-200 text-green-800 dark:bg-green-400/80 dark:text-green-800 px-4 py-1 rounded-full'>
                  Verified Purchase
                </span>
                {/* {review.verified && (
                )} */}
              </div>
              <span className='text-xs text-gray-500 dark:text-gray-400'>
                {formatDate(review.date)}
              </span>
            </div>
            <div className='mb-2'>
              <StarRating rating={review.rating} />
            </div>
            <h3 className='text-base text-text my-2'>{review.reviewTitle}</h3>
            <p className='text-sm text-gray-800 dark:text-gray-300'>{review.reviewMessage}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({})),
  rating: PropTypes.number,
  size: PropTypes.string,
};

export default Reviews;
