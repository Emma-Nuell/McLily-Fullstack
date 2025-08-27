import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AlertTriangle, ArrowLeftRight, Banknote, Check, CreditCard, Shield } from 'lucide-react';


const PaymentInfo = ({ selected, onSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState(selected || "");

  const paymentMethods = [
    {
      id: "paystack",
      name: "Pay Now with Paystack",
      description: "Secure online payment with card or bank transfer",
      icon: CreditCard,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      benefits: [
        "Instant payment confirmation",
        "Secure encryption",
        "Multiple payment options",
      ],
      isRecommended: true,
    },
    {
      id: "cash",
      name: "Cash on Delivery",
      description: "Pay with cash when your order arrives",
      icon: Banknote,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      benefits: [
        "Pay only when you receive your order",
        "No online transaction required",
      ],
      disclaimer:
        "Please have the exact amount ready as we are not subject to having exact change on delivery",
    },
    {
      id: "transfer",
      name: "Transfer on Delivery",
      description: "Pay via bank transfer when your order arrives",
      icon: ArrowLeftRight,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      benefits: [
        "Digital payment on delivery",
        "Bank transfer security",
        "No cash handling required",
      ],
    },
  ];

    const handleMethodSelect = (methodId) => {
      setSelectedMethod(methodId);
    };

    const handleProceed = () => {
      if (!selectedMethod) {
        alert("Please select a payment method to continue");
        return;
      }
      onSelect(selectedMethod);
    };

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-100'>
      {/* Header */}
      <div className='border-b border-gray-100 p-6'>
        <h2 className='text-2xl font-bold text-gray-900 flex items-center gap-3'>
          <CreditCard className='h-6 w-6 text-primary-500' />
          Payment Method
        </h2>
        <p className='text-gray-600 mt-1'>
          Choose how you&apos;d like to pay for your order
        </p>
      </div>

      <div className='p-6'>
        {/* Payment Methods */}
        <div className='space-y-4 mb-8'>
          {paymentMethods.map((method) => {
            const IconComponent = method.icon;
            const isSelected = selectedMethod === method.id;

            return (
              <div
                key={method.id}
                className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all ${
                  isSelected
                    ? "border-primary-500 bg-primary-50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
                onClick={() => handleMethodSelect(method.id)}
              >
                {/* Recommended Badge */}
                {method.isRecommended && (
                  <div className='absolute -top-2 left-4 bg-primary-500 text-white text-xs px-3 py-1 rounded-full font-medium'>
                    Recommended
                  </div>
                )}

                <div className='flex items-start gap-4'>
                  {/* Radio Button */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                      isSelected
                        ? "border-primary-500 bg-primary-500"
                        : "border-gray-300"
                    }`}
                  >
                    {isSelected && <Check className='h-4 w-4 text-white' />}
                  </div>

                  {/* Method Icon */}
                  <div
                    className={`p-3 rounded-lg ${method.bgColor} ${method.borderColor} border`}
                  >
                    <IconComponent className={`h-6 w-6 ${method.iconColor}`} />
                  </div>

                  {/* Method Details */}
                  <div className='flex-1'>
                    <h3 className='font-semibold text-gray-900 text-lg mb-1'>
                      {method.name}
                    </h3>
                    <p className='text-gray-600 mb-3'>{method.description}</p>

                    {/* Benefits */}
                    <div className='space-y-1 mb-3'>
                      {method.benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className='flex items-center gap-2 text-sm text-gray-700'
                        >
                          <Check className='h-4 w-4 text-green-500' />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Disclaimer for Cash on Delivery */}
                    {method.disclaimer && (
                      <div className='bg-amber-50 border border-amber-200 rounded-lg p-3'>
                        <div className='flex items-start gap-2'>
                          <AlertTriangle className='h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5' />
                          <div>
                            <h4 className='font-medium text-amber-800 mb-1'>
                              Important Notice
                            </h4>
                            <p className='text-sm text-amber-700'>
                              {method.disclaimer}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Notice */}
        <div className='bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8'>
          <div className='flex items-center gap-3'>
            <Shield className='h-5 w-5 text-primary-600' />
            <div>
              <h4 className='font-medium text-gray-900'>Secure Payments</h4>
              <p className='text-sm text-gray-600 mt-1'>
                All online transactions are secured with bank-level encryption.
                Your payment information is never stored on our servers.
              </p>
            </div>
          </div>
        </div>

        {/* Selected Method Summary */}
        {selectedMethod && (
          <div className='bg-primary-50 border border-primary-200 rounded-lg p-4 mb-8'>
            <h4 className='font-medium text-primary-900 mb-2'>
              Selected Payment Method
            </h4>
            <div className='flex items-center gap-3'>
              {(() => {
                const method = paymentMethods.find(
                  (m) => m.id === selectedMethod
                );
                const IconComponent = method.icon;
                return (
                  <>
                    <IconComponent className={`h-5 w-5 ${method.iconColor}`} />
                    <span className='font-medium text-primary-800'>
                      {method.name}
                    </span>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100'>
          <button
            className='flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors'
            onClick={() => window.history.back()}
          >
            Back to Delivery
          </button>

          {selectedMethod === "paystack" ? (
            <button
              className='flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-sm flex items-center justify-center gap-2'
              onClick={handleProceed}
            >
              <CreditCard className='h-5 w-5' />
              Pay Now with Paystack
            </button>
          ) : (
            <button
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors shadow-sm ${
                selectedMethod
                  ? "bg-primary-500 hover:bg-primary-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleProceed}
              disabled={!selectedMethod}
            >
              Confirm Order
            </button>
          )}
        </div>

        {/* Additional Info */}
        {selectedMethod && selectedMethod !== "paystack" && (
          <div className='mt-4 text-center'>
            <p className='text-sm text-gray-600'>
              {selectedMethod === "cash"
                ? "You will pay with cash when your order is delivered"
                : "You will complete the bank transfer when your order is delivered"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};


PaymentInfo.propTypes = {
  selected: PropTypes.string,
  onSelect: PropTypes.func
}


export default PaymentInfo