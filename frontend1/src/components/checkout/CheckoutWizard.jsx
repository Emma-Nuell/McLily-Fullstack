import React, { useState } from "react";
import {
  CheckoutProgress,
  CartReview,
  DeliveryInfo,
  OrderConfirmation,
  PaymentGateway,
  PaymentInfo,
  OrderSummary
} from "./index.js";
import { useCartContext, useUserProfileContext } from "../../context/index.js";
const CHECKOUT_STEPS = {
  CART_REVIEW: 1,
  DELIVERY_INFO: 2,
  PAYMENT_METHOD: 3,
  PAYMENT: 4,
  CONFIRMATION: 5,
};

const CheckoutWizard = () => {
  const { cart, clearCart, total_amount } = useCartContext();
  const { user} = useUserProfileContext();
  const [currentStep, setCurrentStep] = useState(CHECKOUT_STEPS.CART_REVIEW);
   const [paymentMethod, setPaymentMethod] = useState("");
   const [deliveryMethod, setDeliveryMethod] = useState('')
   const [order, setOrder] = useState("")

  const [formData, setFormData] = useState({
    customerDetails: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNo: user.phoneNo || "",
      address: {},
    },
    orderItems: cart.map((item) => ({
      productId: item.productId,
      productName: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
      size: item.size,
    })),
    paymentMethod,
    shippingFee: 0,
    deliveryMethod,
    pickupStation: "none",
    pickupAddress: "none"
  });

  const goToStep = (step) => {
    if (step === CHECKOUT_STEPS.PAYMENT_METHOD && !formData.orderItems.length) {
      alert("Your cart is empty");
    }
    setCurrentStep(step);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 dark:bg-surface">
      <CheckoutProgress currentStep={currentStep} />

      <div className="my-8 border border-primary-300 dark:border-primary-100 rounded-md bg-background-white">
        {currentStep === CHECKOUT_STEPS.CART_REVIEW && (
          <CartReview
            items={formData.orderItems}
            onProceed={() => goToStep(CHECKOUT_STEPS.DELIVERY_INFO)}
          />
        )}

        {currentStep === CHECKOUT_STEPS.DELIVERY_INFO && (
          <DeliveryInfo
            data={formData.customerDetails}
            formData={formData}
            setFormData={setFormData}
            setDeliveryMethod={setDeliveryMethod}
            deliveryMethod={deliveryMethod}
            onProceed={() => {
              goToStep(CHECKOUT_STEPS.PAYMENT_METHOD);
            }}
            onBack={() => {
              goToStep(CHECKOUT_STEPS.CART_REVIEW);
            }}
          />
        )}

        {currentStep === CHECKOUT_STEPS.PAYMENT_METHOD && (
          <PaymentInfo
            clearCart={clearCart}
            orderData={formData}
            total_amount={total_amount}
            setPaymentMethod={setPaymentMethod}
            paymentMethod={paymentMethod}
            onProceed={(order) => {
              setOrder(order);
              goToStep(CHECKOUT_STEPS.CONFIRMATION);
            }}
            onBack={() => {
              goToStep(CHECKOUT_STEPS.DELIVERY_INFO);
            }}
          />
        )}

        {currentStep === CHECKOUT_STEPS.PAYMENT && (
          <PaymentGateway
            orderData={formData}
            onSuccess={(order) => {
              setOrder(order);
              goToStep(CHECKOUT_STEPS.CONFIRMATION);
            }}
          />
        )}

        {currentStep === CHECKOUT_STEPS.CONFIRMATION && (
          <OrderConfirmation order={order} />
        )}
      </div>

      {
        !currentStep === CHECKOUT_STEPS.CONFIRMATION && (
          <OrderSummary cartItems={formData.orderItems} deliveryMethod={deliveryMethod} selectedStation={formData.pickupStation} />

        )
      }

    </div>
  );
};

export default CheckoutWizard;
