import { Bike, ChevronDown, ChevronUp, Clock, MapPin, Truck } from 'lucide-react';
import React from 'react'
import { useState } from 'react';

const DeliveryOptions = () => {
      const [expandedOption, setExpandedOption] = useState(null);

      const toggleExpanded = (optionId) => {
        setExpandedOption(expandedOption === optionId ? null : optionId);
      };

  return (
    <div className='bg-surface p-5 shadow-sm my-6'>
      <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4 flex items-center gap-2'>
        <Truck className='text-primary-600 dark:text-primary-300' size={20} />
        Delivery Options
      </h3>

      <div className='space-y-4'>
        {/* Pick Up Station Option */}
        <div className='border border-primary-300 dark:border-primary-100 rounded-lg overflow-hidden'>
          <div className='p-4 bg-gray-50 dark:bg-surface shadow-md'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <MapPin
                  className='text-primary-600 dark:text-primary-300'
                  size={20}
                />
                <div>
                  <h4 className='font-medium text-gray-900 dark:text-gray-200 text-base'>
                    Pick Up Station
                  </h4>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Collect from our partner locations
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleExpanded("pickup")}
                className='flex items-center text-primary-600 dark:text-primary-300 hover:text-primary-700 text-xs font-medium transition-colors'
              >
                More Details
                {expandedOption === "pickup" ? (
                  <ChevronUp className='' size={16} />
                ) : (
                  <ChevronDown className='' size={16} />
                )}
              </button>
            </div>
          </div>

          {expandedOption === "pickup" && (
            <div className='p-4 border-t border-primary-300 dark:border-primary-100 bg-white dark:bg-surface'>
              <p className='text-sm text-gray-700 dark:text-gray-300 mb-4'>
                Choose from our convenient pickup locations. Your order will be
                ready for collection on the next available pickup day after
                confirmation.
              </p>
              <div className='space-y-3'>
                <div className='flex justify-between items-center p-3 bg-gray-50 dark:bg-background-white rounded-lg'>
                  <div>
                    <p className='font-medium text-gray-900 dark:text-gray-200'>
                      Stella Maris Schools
                    </p>
                    <p className='text-xs text-gray-600 dark:text-gray-400'>
                      Available Monday - Friday, 9AM - 4PM
                    </p>
                  </div>
                  <span className='text-base font-semibold text-green-600 dark:text-green-700'>
                    ₦2,500
                  </span>
                </div>
                <div className='flex justify-between items-center p-3 bg-gray-50 dark:bg-background-white rounded-lg'>
                  <div>
                    <p className='font-medium text-gray-900 dark:text-gray-200'>
                      McLily Hair Salon
                    </p>
                    <p className='text-xs text-gray-600 dark:text-gray-400'>
                      Available Tuesday - Saturday, 10AM - 6PM
                    </p>
                  </div>
                  <span className='text-base font-semibold text-green-600 dark:text-green-700'>
                    ₦3,700
                  </span>
                </div>
                <div className='flex justify-between items-center p-3 bg-gray-50 dark:bg-background-white rounded-lg'>
                  <div>
                    <p className='font-medium text-gray-900 dark:text-gray-200'>
                      McLily House
                    </p>
                    <p className='text-xs text-gray-600 dark:text-gray-400'>
                      Available Monday - Saturday, 10AM - 6PM
                    </p>
                  </div>
                  <span className='text-base font-semibold text-green-600 dark:text-green-700'>
                    ₦1,500
                  </span>
                </div>
                <div className='flex justify-between items-center p-3 bg-gray-50 dark:bg-background-white rounded-lg'>
                  <div>
                    <p className='font-medium text-gray-900 dark:text-gray-200'>
                      Afe Babalola University
                    </p>
                    <p className='text-xs text-gray-600 dark:text-gray-400'>
                      Available Every 2 weeks on Saturdays, 2PM - 5PM
                    </p>
                  </div>
                  <span className='text-base font-semibold text-green-600 dark:text-green-700'>
                    ₦4,000
                  </span>
                </div>
              </div>
              <div className='mt-4 p-3 bg-primary-50 dark:bg-primary-800 rounded-lg'>
                <p className='text-xs text-blue-700 dark:text-blue-500'>
                  <strong>Note:</strong> Please bring a valid ID and your order
                  confirmation when collecting your package.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Third Party Delivery Option */}
        <div className='border border-primary-300 dark:border-primary-100 rounded-lg overflow-hidden'>
          <div className='p-4 bg-gray-50 dark:bg-surface shadow-md'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <Bike
                  className='text-primary-600 dark:text-primary-300'
                  size={20}
                />
                <div>
                  <h4 className='font-medium text-gray-900 dark:text-gray-200'>
                    Third Party Delivery
                  </h4>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Fast delivery via partner services
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleExpanded("thirdparty")}
                className='flex items-center gap-1 text-primary-600 dark:text-primary-300 hover:text-primary-700 text-xs font-medium transition-colors'
              >
                More Details
                {expandedOption === "thirdparty" ? (
                  <ChevronUp className='' size={16} />
                ) : (
                  <ChevronDown className='' size={16} />
                )}
              </button>
            </div>
          </div>

          {expandedOption === "thirdparty" && (
            <div className='p-4 border-t border-primary-300 dark:border-primary-100 bg-white dark:bg-surface'>
              <p className='text-sm text-gray-700 dark:text-gray-300 mb-4'>
                We partner with reliable third-party delivery services like Bolt
                Delivery to get your order to you quickly and safely.
              </p>
              <div className='space-y-3'>
                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <span>Delivery within Abuja: 1-3 business hours</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <span>Real-time tracking available</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <span>Contact-free delivery options</span>
                </div>
              </div>
              <div className='mt-4 p-3 bg-primary-50 dark:bg-primary-800 rounded-lg'>
                <p className='text-xs text-orange-700 dark:text-orange-600'>
                  <strong>Pricing:</strong> Delivery fees are calculated based
                  on your location and depend solely on the third party service.
                  Typically ranges from ₦2,000 - ₦8,000 within Abuja. To be paid
                  fully by the customer on delivery(delivery fee not included on
                  checkout payment)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Coming Soon Option */}
        <div className='border border-primary-300 dark:border-primary-100 rounded-lg p-4 bg-gray-50 dark:bg-surface opacity-75'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Clock className=' text-gray-400' size={18} />
              <div>
                <h4 className='font-medium text-gray-700 dark:text-gray-300'>
                  McLily Door Delivery
                </h4>
                <p className='text-sm text-gray-500'>
                  Our own delivery service
                </p>
              </div>
            </div>
            <div className=' text-text border-primary-300 dark:border-primary-100 border text-xs font-medium px-2 py-1 rounded-full'>
              Coming Soon
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg'>
        <p className='text-xs text-blue-800 dark:text-blue-400'>
          <strong>Need help choosing?</strong> Contact our customer support team
          for personalized delivery recommendations based on your location and
          urgency.
        </p>
      </div>
    </div>
  );
}

export default DeliveryOptions