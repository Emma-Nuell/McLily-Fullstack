import React from 'react'
import PropTypes from 'prop-types'
import { ChevronRight } from 'lucide-react';

const CheckoutProgress = ({ currentStep }) => {
    const steps = [
      { id: 1, name: "Cart Review" },
      { id: 2, name: "Delivery" },
      { id: 3, name: "Payment" },
      { id: 4, name: "Complete" },
    ];
  return (
    <div className='p-4 border-b border-gray-100'>
      <div className='flex items-center justify-between'>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className='flex flex-col items-center'>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.id
                    ? "bg-primary-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.id}
              </div>
              <span className='text-xs text-gray-600 mt-1 text-center'>
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  currentStep > step.id ? "bg-primary-500" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

CheckoutProgress.propTypes = {
    currentStep: PropTypes.number.isRequired
}

export default CheckoutProgress