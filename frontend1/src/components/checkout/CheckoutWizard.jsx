import React, { useState } from 'react'
import {CheckoutProgress, CartReview, DeliveryInfo, OrderConfirmation, PaymentGateway, PaymentInfo} from "./index.js"
const CHECKOUT_STEPS = {
    CART_REVIEW: 1,
    DELIVERY_INFO: 2,
    PAYMENT_METHOD: 3,
    PAYMENT: 4,
    CONFIRMATION: 5,
}


const CheckoutWizard = () => {
    const [currentStep, setCurrentStep] = useState(CHECKOUT_STEPS.CART_REVIEW)
    const [formData, setFormData] = useState({
        cart: [],
        paymentMethod: "",
        delivery: {
            address: "",
            method: "standard"
        }
    })

    const goToStep = (step) => {
        if (step === CHECKOUT_STEPS.PAYMENT_METHOD && !formData.cart.length) {
        alert("Your cart is empty")
        }
        setCurrentStep(step)
  }

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <CheckoutProgress currentStep={currentStep} />

      <div className='my-8'>
        {currentStep === CHECKOUT_STEPS.CART_REVIEW && (
          <CartReview
            items={formData.cart}
            onProceed={() => goToStep(CHECKOUT_STEPS.PAYMENT_METHOD)}
          />
        )}


        {currentStep === CHECKOUT_STEPS.DELIVERY_INFO && (
          <DeliveryInfo
          data={formData.delivery}
          onSubmit={(delivery) => {
              setFormData({ ...formData, delivery });
              goToStep(CHECKOUT_STEPS.PAYMENT);
            }}
            />
              )}
              
        {currentStep === CHECKOUT_STEPS.PAYMENT_METHOD && (
          <PaymentInfo
            selected={formData.paymentMethod}
            onSelect={(method) => {
              setFormData({ ...formData, paymentMethod: method });
              goToStep(CHECKOUT_STEPS.DELIVERY_INFO);
            }}
          />
        )}

        {currentStep === CHECKOUT_STEPS.PAYMENT && (
          <PaymentGateway
            orderData={formData}
            onSuccess={() => goToStep(CHECKOUT_STEPS.CONFIRMATION)}
          />
        )}

        {currentStep === CHECKOUT_STEPS.CONFIRMATION && (
          <OrderConfirmation order={formData} />
        )}
      </div>
    </div>
  );
}

export default CheckoutWizard