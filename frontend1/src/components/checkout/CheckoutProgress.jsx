import React from 'react'
import PropTypes from 'prop-types'
import { ChevronRight } from 'lucide-react';

const CheckoutProgress = ({ currentStep }) => {
    const steps = [
      { id: 1, name: "Cart" },
      { id: 2, name: "Payment Method" },
      { id: 3, name: "Delivery" },
      { id: 4, name: "Payment" },
    ];
  return (
    <nav className='flex items-center justify-center'>
      <ol className='flex items-center space-x-8'>
        {steps.map((step) => (
          <li key={step.id} className='flex items-center'>
            <span
              className={`flex items-center justify-center w-8 h-8 rounded-full 
            ${
              currentStep >= step.id
                ? "bg-primary-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            >
              {step.id}
            </span>
            <span
              className={`ml-2 text-sm font-medium ${
                currentStep >= step.id ? "text-primary-600" : "text-gray-500"
              }`}
            >
              {step.name}
            </span>
            {step.id < steps.length && (
              <ChevronRight className='ml-8 h-5 w-5 text-gray-400' />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

CheckoutProgress.propTypes = {
    currentStep: PropTypes.number.isRequired
}

export default CheckoutProgress